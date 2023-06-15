const db = require("../../database/models");

const get = async (req, res) => {
  try {
    const propietario = await db.models.Propietario.findAll();
    const formatData = propietario.map(item =>{
      return{

        cod_propietario: item?.cod_propietario,
        nombre: item?.nombre,
        dni: item?.dni,
        celular: item?.celular,
        direccion: item?.direccion,
        titulo_propiedad: item?.titulo_propiedad
      }
    })
    return res.status(200).json({ data: formatData });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo obtener la lista de propietarios" });
  }
};

const post = async (req, res) => {
  try {
    let newPropietarioData = { ...req.body };

    delete newPropietarioData.titulo_propiedad;

    // Verificar si se subió una imagen
    if (req.file) {
      // Concatenar la ruta de la imagen al nombre del archivo
      newPropietarioData.titulo_propiedad =
        process.env.LOCAL_TITLE + req.file.filename;
    }

    await db.models.Propietario.create(newPropietarioData);
    return res.status(200).json({ msg: "Propietario registrado con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo registrar ." });
  }
};

const update = async (req, res) => {
  let id = req.params.id;
  try {
    let updateData = { ...req.body };

    const propietario = await db.models.Propietario.findOne({
      where: { cod_propietario: id },
    });

    if (!propietario) {
      return res.status(404).json({ msg: "No se encontró el propietario." });
    }
    if (req.file) {
      updateData.titulo_propiedad = process.env.LOCAL_TITLE + req.file.filename;
    } else if (
      req.body.titulo_propiedad === undefined ||
      req.body.titulo_propiedad.trim() === ""
    ) {
      delete updateData.titulo_propiedad;
    }

    await db.models.Propietario.update(updateData, {
      where: { cod_propietario: id },
    });
    return res.status(200).json({ msg: "Propietario actualizado con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo actualizar." });
  }
};

const delte = async (req, res) => {
  let id = req.params.id;

  try {
    const propietario = await db.models.Propietario.findOne({
      where: { cod_propietario: id },
    });

    if (!propietario) {
      return res.status(404).json({ msg: "No se encontró el propietario." });
    }
    await db.models.Propietario.destroy({ where: { cod_propietario: id } });
    return res.status(200).json({ msg: "Propietario eliminado con éxito!" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar." });
  }
};

module.exports = { get, post, update, delte };
