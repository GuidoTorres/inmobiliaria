const db = require("../../database/models");
const {
  tokenSign,
  refreshSign,
  verifyRefreshToken,
} = require("../helpers/generateToken");
const { compare, regenerateTokens } = require("./auth");
const dayjs = require("dayjs");
const jwt = require("jsonwebtoken")

const authLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Primero busca en la tabla de Agentes
    let user = await db.models.Usuario.findOne({
      where: { correo: email }, include:[{model:db.models.Rol}]
    });
    console.log(user);
    // Si el usuario no se encuentra en ninguna de las tablas, devuelve un error
    if (!user) {
      return res.status(404).json({ msg: "No se encontro el usuario." });
    }
    const checkPassword = await compare(password, user.password);
    const tokenSession = await tokenSign(user);
    const refreshToken = await refreshSign(user); // Generar el refresh token

    if (checkPassword) {
      // Registrar inicio de sesión
      await db.models.RegistroInicioSesion.create({
        fecha_ingreso: dayjs().format("YYYY-MM-DD"),
        hora_ingreso: dayjs().format("HH:mm:ss"),
        cod_usuario: user.cod_usuario,
      });

      res.status(200).send({
        data: user,
        token: tokenSession,
        refreshToken,
      });
    }

    if (!checkPassword) {
      res.status(409).send({
        error: "Contraseña invalida",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(409).send({
      error: "Hubo un error",
    });
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const newTokens = await regenerateTokens(refreshToken);
    if (!newTokens) {
      return res.status(401).json({ msg: "Refresh token invalido" });
    }

    res.status(200).json(newTokens);
  } catch (err) {
    console.error(err);
    res.status(500).json({ ms: "Hubo un error"});
  }
};

module.exports = { authLogin, refreshToken };
