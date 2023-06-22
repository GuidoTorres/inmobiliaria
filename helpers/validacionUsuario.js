// helpers.js

const db = require("../database/models");
const { Usuario } = db.models;
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

module.exports = { countUsers, checkEmailInUse, checkDniInUse };
