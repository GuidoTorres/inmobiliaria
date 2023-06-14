const db = require("../../database/models");

const get = async (req, res) => {
  try {
    const propietario = await db.models.Propietario.findAll();
    return res.status(200).json({ data: propietario });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo obtener la lista de propietarios" });
  }
};

const post = async (req, res) => {
  try {
    let newPropietarioData = {...req.body};

   // Verificar si se subió una imagen
   if (req.file) {
    // Concatenar la ruta de la imagen al nombre del archivo
    newPropietarioData.titulo_propiedad = process.env.LOCAL_TITLE + req.file.filename;
  }else{
    newPropietarioData.titulo_propiedad = ""

  }

    await db.models.Propietario.create(newPropietarioData);
    return res
      .status(200)
      .json({ msg: "Propietario registrado con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo registrar ." });
  }
};

const update = async (req, res) => {
  let id = req.params.id;
  try {
    await db.models.Propietario.update(req.body, { where: { cod_propietario: id } });
    return res
      .status(200)
      .json({ msg: "Propietario actualizado con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo actualizar."});
  }
};

const delte = async (req, res) => {
  let id = req.params.id;

  try {
    await db.models.Propietario.destroy({ where: { cod_propietario: id } });
    return res
      .status(200)
      .json({ msg: "Propietario eliminado con éxito!" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar." });
  }
};

module.exports = { get, post, update, delte };
