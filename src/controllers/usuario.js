const db = require("../../database/models");
require("dotenv").config();
const { encrypt } = require("./auth");
const nodemailer = require("nodemailer");
const { Usuario, Rol } = db.models;
const { Op } = require("sequelize");
const {
  checkEmailInUse,
  checkDniInUse,
  countUsers,
} = require("../../helpers/validacionUsuario");
const { checkUserExists } = require("../../helpers/validacionUsuarioUpdate");

const get = async (req, res) => {
  try {
    const usuario = await Usuario.findAll({ 
      where: { tipo: null }, 
      include: { model: Rol } 
    });
    
    const formatUsuario = usuario.map((item) => {
      return {
        cod_usuario: item?.cod_usuario,
        nombre: item?.nombre,
        dni: item?.dni,
        correo: item?.correo,
        celular: item?.celular,
        contrasenia: item?.password,
        oficina: item?.oficina,
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
    const count= await countUsers();
    const emailInUse = await checkEmailInUse(correo);
    const dniInUse = await checkDniInUse(dni);
    console.log(count);
    if (count >= 10) {
      return res
        .status(400)
        .json({ msg: "No se pueden crear mas de 10 usuarios." });
    }
    if (emailInUse) {
      return res.status(400).json({ msg: "El correo ya está en uso." });
    }
    if (dniInUse) {
      return res.status(400).json({ msg: "El DNI ya está en uso." });
    }

    let nuevoUsuario = {
      nombre: nombre,
      dni: dni,
      celular: celular,
      correo: correo,
      password: await encrypt(password),
      oficina: oficina,
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

    const existeusuario = await checkUserExists(id);
    const existeCorreo = await checkEmailInUse(id, correo);
    const existeDNI = await checkDniInUse(id, dni);

    if (!existeusuario) {
      return res.status(400).json({ msg: "El usuario no está registrado." });
    }
    if (existeCorreo) {
      return res.status(400).json({ msg: "El correo ya está registrado." });
    }
    if (existeDNI) {
      return res.status(400).json({ msg: "El DNI ya está registrado." });
    }

    let nuevoUsuario = {
      nombre: nombre,
      dni: dni,
      celular: celular,
      correo: correo,
      cod_rol: cod_rol,
    };
    if (password) {
      nuevoUsuario.password = await encrypt(password);
    }

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
    const user = await checkUserExists(id);

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
      return res
        .status(404)
        .json({ msg: "El correo no se encuentra registrado en el sistema." });
    }

    const recoveryCode = Math.floor(1000 + Math.random() * 9000).toString();

    await Usuario.update(
      { cod_recuperacion: recoveryCode },
      { where: { correo: correo } }
    );

    var transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Enviar correo con el objeto de transporte
    let info = await transporter.sendMail({
      from: '"Inmobiliara Roca Rey" <support@example.com>', // sender address
      to: "gt12930@gmail.com", // correo variable
      subject: "Código de recuperación de cuenta", // Subject line
      text: `Tu codigo de recuperacion es: ${recoveryCode}`, // plain text body
    });

    if (info.messageId) {
      return res
        .status(200)
        .json({ msg: "El código de recuperación ha sido enviado." });
    } else {
      throw new Error("Failed to send email");
    }
  } catch (error) {
    console.log(error);
    if (error.message === "Failed to send email") {
      res
        .status(500)
        .json({ msg: "No se pudo enviar el correo de recuperación." });
    } else {
      res
        .status(500)
        .json({ msg: "No se pudo enviar el código de recuperación." });
    }
  }
};

module.exports = { get, post, update, delte, codigoRecuperacion };
