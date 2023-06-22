// updateHelpers.js

const db = require("../database/models");
const { Usuario } = db.models;

const checkUserExists = async (id) => {
    try {
      return await Usuario.findByPk(id);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

const checkEmailInUseUpdate = async (id, correo) => {
  try {
    return await Usuario.findOne({ 
      where: { 
        correo,
        cod_usuario: { [Op.ne]: id }
      } 
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const checkDniInUseUpdate = async (id, dni) => {
  try {
    return await Usuario.findOne({ 
      where: { 
        dni,
        cod_usuario: { [Op.ne]: id }
      } 
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = { checkUserExists, checkEmailInUseUpdate, checkDniInUseUpdate };
