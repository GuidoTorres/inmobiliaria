// helpers.js

const { log } = require("handlebars");
const db = require("../database/models");
const { Usuario } = db.models;
const { Op } = require("sequelize");

const countUsers = async () => {
  try {
    return await Usuario.count();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const checkEmailInUse = async (correo) => {
  try {
    return await Usuario.findOne({ where: { correo } });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const checkDniInUse = async (dni) => {
  try {
    return await Usuario.findOne({ where: { dni } });
  } catch (err) {
    console.error(err);
    throw err;
  }
};
const checkEmailInUseUpate = async (correo, id) => {
  try {
    const usuarioEncontrado = await Usuario.findOne({ where: { correo, cod_usuario: { [Op.ne]: id } } });

    if (usuarioEncontrado) {
      return true; // El correo está en uso por otro usuario
    }

    return false;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const checkDniInUseUpdate = async (dni, id) => {
  try {
    const usuarioEncontrado = await Usuario.findOne({ where: { dni, cod_usuario: { [Op.ne]: id } } });

    if (usuarioEncontrado) {
      return true; // El correo está en uso por otro usuario
    }

    return false;
  } catch (err) {
    console.error(err);
    throw err;
  }
};



module.exports = { countUsers, checkEmailInUse, checkDniInUse, checkEmailInUseUpate, checkDniInUseUpdate };
