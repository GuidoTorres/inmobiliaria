const db = require("../../database/models");
const { Permiso, Modulo } = db.models;

const get = async (req, res) => {
  try {
    const permisos = await Permiso.findAll({
      attributes: ["cod_permiso", "permiso", "descripcion", "key"],
      include: [
        { model: Modulo},
      ],
    });

    const formatData = permisos.map(permiso => {
      return{
        cod_permiso: permiso.cod_permiso,
        categoria: permiso.permiso,
        descripcion: permiso.descripcion
      }
    });


    return res.status(200).json({ data: formatData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo obtener la lista de permisos" });
  }
};
const post = async (req, res) => {
  try {
    await Permiso.create(req.body);
    return res.status(200).json({ msg: "Permiso registrado con éxito!" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo registrar el permiso." });
  }
};
const update = async (req, res) => {
  let id = req.params.id;
  try {
    const permiso = await Permiso.findOne({
      where: { cod_permiso: id },
    });

    if (!permiso) {
      return res.status(404).json({ msg: "No se encontró el permiso." });
    }
    await Permiso.update(req.body, { where: { cod_permiso: id } });
    return res.status(200).json({ msg: "Permiso actualizado con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo actualizar el Permiso." });
  }
};
const delte = async (req, res) => {
  let id = req.params.id;

  try {
    const permiso = await Permiso.findOne({
      where: { cod_permiso: id },
    });

    if (!permiso) {
      return res.status(404).json({ msg: "No se encontró el permiso." });
    }
    await Permiso.destroy({ where: { cod_permiso: id } });
    return res.status(200).json({ msg: "Permiso eliminado con éxito!" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar el Permiso." });
  }
};

module.exports = { get, post, update, delte };
