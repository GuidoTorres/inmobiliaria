const db = require("../../database/models");
require("dotenv").config();
const { encrypt } = require("./auth");
const nodemailer = require("nodemailer");
const { Usuario, Rol, RegistroInicioSesion } = db.models;
const { Op, where } = require("sequelize");
const {
  checkEmailInUse,
  checkDniInUse,
  countUsers,
} = require("../../helpers/validacionUsuario");
const { checkUserExists } = require("../../helpers/validacionUsuarioUpdate");
const fs = require('fs');
const path = require("path");


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
    const emailInUse = await checkEmailInUse(correo);
    const dniInUse = await checkDniInUse(dni);

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
    await RegistroInicioSesion.destroy({ where: { cod_usuario: id } });
    await Usuario.destroy({ where: { cod_usuario: id } });
    return res.status(200).json({ msg: "Usuario eliminado con éxito!" });
  } catch (error) {
    console.log(error);
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
    let html = fs.readFileSync(path.resolve(__dirname, '../../views/correo.html'), 'utf8');

    html = html.replace('{{recoveryCode}}', recoveryCode);

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
      to: correo, // correo variable
      subject: "Código de recuperación de cuenta", // Subject line
      html:html, // plain text body
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

const compararCodRecuperacion = async (req, res, next) => {
  let id = req.params.id;

  try {
    const user = await Usuario.findOne({where:{cod_recuperacion:id}})

    if(!user){
      return res.status(404).json({ msg: "El código de recuperación no es válido o ha expirado." });
    }
  
    // Aquí, el código de recuperación es correcto.
    // Puedes continuar con el proceso de permitirle al usuario que cambie su contraseña.
    // Nota: asegúrate de manejar esto de una manera segura.
    return res.status(200).json({ msg: "Código de recuperación válido. Por favor, procede a cambiar tu contraseña." });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Ha ocurrido un error al verificar el código de recuperación." });
  }
}

const actualizarPassword = async (req, res, next) => {
  try {
    const { cod_recuperacion, password } = req.body;

    // Buscar el usuario por el código de recuperación
    const usuario = await Usuario.findOne({ where: { cod_recuperacion: cod_recuperacion } });

    if (!usuario) {
      return res.status(404).json({ msg: "El código de recuperación no es válido o ha expirado." });
    }

    // Hash de la nueva contraseña antes de guardarla
    const hashedPassword = await encrypt(password);

    // Actualizar la contraseña del usuario
    await Usuario.update(
      { password: hashedPassword, cod_recuperacion: null },
      { where: { cod_recuperacion: cod_recuperacion } }
    );

    return res.status(200).json({ msg: "Contraseña actualizada con éxito." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Hubo un error al actualizar la contraseña." });
  }
};




module.exports = { get, post, update, delte, codigoRecuperacion, compararCodRecuperacion,actualizarPassword };
