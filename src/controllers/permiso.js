const db = require("../../database/models");

const get = async (req, res) => {
  try {
    const permiso = await db.models.Permiso.findAll();
    return res.status(200).json({ data: permiso });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo obtener la lista de permisos" });
  }
};

const post = async (req, res) => {
  try {
    await db.models.Permiso.create(req.body);
    return res
      .status(200)
      .json({ msg: "Permiso registrado con éxito!" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo registrar el permiso." });
  }
};

const update = async (req, res) => {
  let id = req.params.id;
  try {
    await db.models.Permiso.update(req.body, { where: { cod_permiso: id } });
    return res
      .status(200)
      .json({ msg: "Permiso actualizado con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo actualizar el Permiso."});
  }
};

const delte = async (req, res) => {
  let id = req.params.id;

  try {
    await db.models.Permiso.destroy({ where: { cod_permiso: id } });
    return res
      .status(200)
      .json({ msg: "Permiso eliminado con éxito!" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar el Permiso." });
  }
};

module.exports = { get, post, update, delte };
