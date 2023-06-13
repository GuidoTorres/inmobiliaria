const db = require("../../database/models");
const { Usuario, Rol } = db.models;
const { encrypt } = require("./auth");

const get = async (req, res) => {
  try {
    const cliente = await Usuario.findAll({
      where: { rol: "Cliente" },
      include: [{ model: Rol }],
    });
    return res.status(200).json({ data: cliente });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo obtener la lista de clientes" });
  }
};
const getClienteTrabajado = async (req, res) => {
  try {
    const cliente = await Usuario.findAll({
      where: { rol: "Cliente", estado: true },
      include: [{ model: Rol }],
    });
    return res.status(200).json({ data: cliente });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo obtener la lista de clientes" });
  }
};

const post = async (req, res) => {
  try {
    const { cod_rol, password, nombre, dni, celular, correo } =
      req.body;

    let nuevoUsuario = {
      nombre: nombre,
      dni: dni,
      celular: celular,
      correo: correo,
      password: await encrypt(password),
      estado: false,
      cod_rol: cod_rol,
    };

    await Usuario.create(nuevoUsuario);
    return res.status(200).json({ msg: "Cliente registrado con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo registrar el Cliente." });
  }
};

const update = async (req, res) => {
  let id = req.params.id;
  try {
    await Usuario.update(req.body, { where: { cod_usuario: id } });
    return res.status(200).json({ msg: "Cliente actualizado con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo actualizar el cliente." });
  }
};

const delte = async (req, res) => {
  let id = req.params.id;

  try {
    await Usuario.destroy({
      where: { cod_usuario: id },
    });

    return res.status(200).json({ msg: "Cliente eliminado con éxito!" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar el cliente." });
  }
};

module.exports = { get, post, update, delte, getClienteTrabajado };
