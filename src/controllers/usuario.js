const db = require("../../database/models");
const { encrypt } = require("./auth");
const nodemailer = require("nodemailer");
const { Usuario, Rol } = db.models;

const get = async (req, res) => {
  try {
    const usuario = await Usuario.findAll({ include: { model: Rol } });

    const formatUsuario = usuario.map((item) => {
      return {
        cod_usuario: item?.cod_usuario,
        nombre: item?.nombre,
        dni: item?.dni,
        correo: item?.correo,
        celular: item?.celular,
        contrasenia: item?.password,
        rol: item?.rol,
      };
    });
    return res.status(200).json({ data: formatUsuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo obtener la lista de usuarios." });
  }
};

const post = async (req, res) => {
  try {
    const { cod_rol, password, nombre, dni, celular, correo, oficina, estado } =
      req.body;

    // Verificar si el correo electrónico ya está en uso
    const emailInUse = await Usuario.findOne({ where: { correo: correo } });
    if (emailInUse) {
      return res
        .status(400)
        .json({ msg: "El correo electrónico ya está en uso." });
    }

    // Verificar si el DNI ya está en uso
    const dniInUse = await Usuario.findOne({ where: { dni: dni } });
    if (dniInUse) {
      return res.status(400).json({ msg: "El DNI ya está en uso." });
    }

    let nuevoUsuario = {
      nombre: nombre,
      dni: dni,
      celular: celular,
      correo: correo,
      password: await encrypt(password),
      cod_rol: cod_rol,
    };

    if ((cod_rol == 1 || cod_rol == 2) && oficina !== null) {
      nuevoUsuario.oficina = oficina;
    } else if (cod_rol == 3 && estado !== null) {
      nuevoUsuario.estado = estado;
    }

    const usuario = await Usuario.create(nuevoUsuario);
    return res.status(200).json({ msg: "Usuario registrado con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo registrar el usuario." });
  }
};

const update = async (req, res) => {
  let id = req.params.id;
  try {
    const { cod_rol, password, nombre, dni, celular, correo, oficina, estado } =
      req.body;
    const user = await Usuario.findOne({
      where: { cod_usuario: id },
    });

    if (!user) {
      return res.status(404).json({ msg: "No se encontró el usuario." });
    }
    // Verificar si el correo electrónico ya está en uso
    const emailInUse = await Usuario.findOne({
      where: { correo: correo, cod_usuario: { [Op.ne]: id } },
    });
    if (emailInUse) {
      return res
        .status(400)
        .json({ msg: "El correo electrónico ya está en uso." });
    }

    // Verificar si el DNI ya está en uso
    const dniInUse = await Usuario.findOne({
      where: { dni: dni, cod_usuario: { [Op.ne]: id } },
    });
    if (dniInUse) {
      return res.status(400).json({ msg: "El DNI ya está en uso." });
    }

    let nuevoUsuario = {
      nombre: nombre,
      dni: dni,
      celular: celular,
      correo: correo,
      // password: await encrypt(password),
      cod_rol: cod_rol,
    };

    if ((cod_rol == 1 || cod_rol == 2) && oficina !== null) {
      nuevoUsuario.oficina = oficina;
    } else if (cod_rol == 3 && estado !== null) {
      nuevoUsuario.estado = false;
    }
    await Usuario.update(nuevoUsuario, { where: { cod_usuario: id } });
    return res.status(200).json({ msg: "Usuario actualizado con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo actualizar el usuario." });
  }
};

const delte = async (req, res) => {
  let id = req.params.id;

  try {
    const user = await Usuario.findOne({
      where: { cod_usuario: id },
    });

    if (!user) {
      return res.status(404).json({ msg: "No se encontró el usuario." });
    }
    await Usuario.destroy({ where: { cod_usuario: id } });
    return res.status(200).json({ msg: "Usuario eliminado con éxito!" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar el usuario." });
  }
};

const codigoRecuperacion = async (req, res, next) => {
  try {
    const { correo } = req.body;

    const usuario = await Usuario.findOne({ where: { correo: correo } });
    if (!usuario) {
      return res.status(404).json({ msg: "El usuario no existe." });
    }

    const recoveryCode = Math.floor(1000 + Math.random() * 9000).toString();

    await Usuario.update(
      { cod_recuperacion: recoveryCode },
      { where: { correo: correo } }
    );

    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "c09d962a6bf982",
        pass: "08b1aeec0bccec"
      }
    });

    // Enviar correo con el objeto de transporte
    let info = await transporter.sendMail({
      from: '"Inmobiliara Roca Rey" <support@example.com>', // sender address
      to: "gt12930@gmail.com", // receiver
      subject: "Código de recuperación de cuenta", // Subject line
      text: `Tu codigo de recuperacion es: ${recoveryCode}`, // plain text body
    });

    return res
      .status(200)
      .json({ msg: "El código de recuperación ha sido enviado." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "No se pudo enviar el código de recuperación." });
  }
};

module.exports = { get, post, update, delte, codigoRecuperacion };
