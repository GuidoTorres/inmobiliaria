const db = require("../../database/models");
const { Usuario, Rol } = db.models;

const { encrypt } = require("./auth");

const get = async (req, res) => {
  try {
    const agente = await Usuario.findAll({
      where: { cod_rol: 2 },
      include: [{ model: Rol }],
    });
    return res.status(200).json({ data: agente });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo obtener la lista de trabajadores." });
  }
};

const post = async (req, res) => {
  try {
    const { cod_rol, password, nombre, dni, celular, correo, oficina } =
      req.body;

    let nuevoUsuario = {
      nombre: nombre,
      dni: dni,
      celular: celular,
      correo: correo,
      password: await encrypt(password),
      oficina: oficina,
      cod_rol: cod_rol,
    };

    await Usuario.create(nuevoUsuario);
    return res.status(200).json({ msg: "Trabajador registrado con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo registrar el Trabajador." });
  }
};

const update = async (req, res) => {
  let id = req.params.id;
  try {
    await Usuario.update(req.body, { where: { cod_usuario: id } });
    return res.status(200).json({ msg: "Trabajador actualizado con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo actualizar al Trabajador." });
  }
};

const delte = async (req, res) => {
  let id = req.params.id;

  try {
    await Usuario.destroy({
      where: { cod_usuario: id },
    });

    return res.status(200).json({ msg: "Trabajador eliminado con éxito!" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar al trabajador." });
  }
};

module.exports = { get, post, update, delte };
