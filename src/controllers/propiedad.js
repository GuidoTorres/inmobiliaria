const db = require("../../database/models");
const {Propiedad, ImagenVideo} = db.models
const get = async (req, res) => {
  try {
    const propiedad = await Propiedad.findAll({include:[{model: ImagenVideo}]});
    return res.status(200).json({ data: propiedad });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo obtener la lista de propiedades" });
  }
};

const post = async (req, res) => {
  try {
    let newPropiedadData = {...req.body};

    // Eliminar los campos 'imagen' y 'video' del objeto newPropiedadData
    delete newPropiedadData.imagen;
    delete newPropiedadData.video;

    let newPropiedad = await Propiedad.create(newPropiedadData);
    if (req.files) {  // Si hay archivos subidos
      let allFiles = [...req.files.imagen, ...req.files.video];  // Unimos los arrays de imágenes y vídeos en uno solo
    
      for (let i = 0; i < allFiles.length; i++) {
        let rutaImagenVideo = process.env.LOCAL_IMAGE + allFiles[i].filename;
        
        // Distinguir entre imágenes y videos por su tipo de contenido MIME
        let tipo = allFiles[i].mimetype.startsWith("image/") ? "imagen" : "video";
    
        let newImagenVideo = {
          url: rutaImagenVideo,
          tipo: tipo,
          cod_propiedad: newPropiedad.cod_propiedad
        };
        console.log(newImagenVideo);
    
        await ImagenVideo.create(newImagenVideo);
      }
    }

    return res.status(200).json({ msg: "Propiedad registrada con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo registrar la propiedad." });
  }
};


const update = async (req, res) => {
  let id = req.params.id;
  try {
    let propiedadData = {...req.body};

    // Eliminar los campos 'imagen' y 'video' del objeto propiedadData
    delete propiedadData.imagen;
    delete propiedadData.video;

    // Actualizar las propiedades básicas de la propiedad
    await Propiedad.update(propiedadData, { where: { cod_propiedad: id } });

    // Si hay archivos subidos, manejarlos
    if (req.files) {
      // Buscar y eliminar todas las entradas de ImagenVideo para esta propiedad
      let oldImagenesVideos = await ImagenVideo.findAll({ where: { propiedadId: id } });
      for (let i = 0; i < oldImagenesVideos.length; i++) {
        // Aquí también podrías eliminar los archivos viejos del servidor si es necesario
        await oldImagenesVideos[i].destroy();
      }

      // Subir y crear entradas para los nuevos archivos
      for (let i = 0; i < req.files.length; i++) {
        let rutaImagenVideo = process.env.LOCAL_MEDIA + req.files[i].filename;
        let tipo = req.files[i].mimetype.startsWith("image/") ? "imagen" : "video";

        let newImagenVideo = {
          propiedadId: id,
          ruta: rutaImagenVideo,
          tipo: tipo
        };
        await ImagenVideo.create(newImagenVideo);
      }
    }

    return res.status(200).json({ msg: "Propiedad actualizada con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo actualizar."});
  }
};


const delte = async (req, res) => {
  let id = req.params.id;

  try {
    // Buscar y eliminar todas las entradas de ImagenVideo para esta propiedad
    let imagenesVideos = await ImagenVideo.findAll({ where: { propiedadId: id } });
    for (let i = 0; i < imagenesVideos.length; i++) {
        // Aquí también podrías eliminar los archivos del servidor si es necesario
        await imagenesVideos[i].destroy();
    }

    // Después de eliminar todas las imágenes y videos, eliminar la propiedad
    await Propiedad.destroy({ where: { cod_propiedad: id } });
    return res
      .status(200)
      .json({ msg: "Propiedad eliminada con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo eliminar." });
  }
};


module.exports = { get, post, update, delte };
