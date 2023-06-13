const bcrypt = require("bcryptjs");
const db = require("../../database/models");
const { verifyToken, verifyRefreshToken } = require("../helpers/generateToken");
const jwt = require("jsonwebtoken")

const encrypt = async (textPlain) => {
  const hash = await bcrypt.hash(textPlain, 10);
  return hash;
};

const compare = async (passwordPlain, hashPassword) => {
  return await bcrypt.compare(passwordPlain, hashPassword);
};

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    const tokenData = await verifyToken(token);
    if (tokenData._id) {
      next();
    } else {
      res
        .status(409)
        .send({ msg: "No tienes permisos para acceder a esta ruta token." });
    }
  } catch (error) {
    res
      .status(409)
      .send({ msg: "No tienes permisos para acceder a esta ruta token." });
  }
};

const checkRoleAuth = (roles) => async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    const tokenData = await verifyToken(token);
    const userData = await db.models.Usuario.findOne({
      where: { cod_usuario: tokenData._id },
    });

    console.log(userData);

    if ([].concat(roles).includes(userData.cod_rol)) {
      next();
    } else {
      res
        .status(409)
        .res.send({ msg: "No tienes permisos para acceder a esta ruta auth." });
    }
  } catch (error) {
    console.log(error);
    res
      .status(409)
      .send({ msg: "No tienes permisos para acceder a esta ruta auth." });
  }
};

const regenerateTokens = async (token) => {
    try {
      const refresh = await verifyRefreshToken(token);
      // verificar si el usuario todavía existe y está autorizado
      const user = await db.models.Usuario.findOne({where: {cod_usuario:refresh._id}});
      console.log(user.cod_usuario);

      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      
      // generar nuevos tokens
      const token_data = jwt.sign(
        {
            _id:user.cod_usuario,
            role: user.cod_rol
        },
        process.env.JWT_SECRET,
        {expiresIn: "1d"})

      const refreshToken =
      jwt.sign(
        {
            _id:user.cod_usuario,
            role: user.cod_rol
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: "10h"})
  
      return { token: token_data, refreshToken: refreshToken };
    } catch (err) {
      // manejar posibles errores, como un refresh token inválido
      console.error(err);
      return null;
    }
  };

module.exports = { encrypt, compare, checkAuth, checkRoleAuth, regenerateTokens  };
