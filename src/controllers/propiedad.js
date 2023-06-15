const { internal } = require("@hapi/boom");
const db = require("../../database/models");
const { Propiedad, ImagenVideo, Propietario } = db.models;
const get = async (req, res) => {
  try {
    let whereClause = {};
    const {
      busqueda,
      precioMin,
      precioMax,
      tipo,
      zona,
      fechaMin,
      fechaMax,
      orden,
      estado,
    } = req.query;
    // Filtro de búsqueda por texto
    if (busqueda) {
      whereClause.nombre = { [Op.like]: `%${busqueda}%` }; // Asume que 'nombre' es el campo a buscar
    }

    // Filtro de rango de precios
    if (precioMin || precioMax) {
      whereClause.precio = {};
      if (precioMin) {
        whereClause.precio[Op.gte] = precioMin;
      }
      if (precioMax) {
        whereClause.precio[Op.lte] = precioMax;
      }
    }

    // Filtro por tipo
    if (tipo) {
      whereClause.tipo = tipo;
    }

    // Filtro por zona
    if (zona) {
      whereClause.zona = zona;
    }

    // Filtro por estado
    if (estado) {
      whereClause.estado = estado;
    }

    // Filtro de rango de fechas
    if (fechaMin || fechaMax) {
      whereClause.fecha = {};
      if (fechaMin) {
        whereClause.fecha[Op.gte] = fechaMin;
      }
      if (fechaMax) {
        whereClause.fecha[Op.lte] = fechaMax;
      }
    }

    let orderClause = [];
    // Ordenamiento
    // Ordenamiento de A-Z
    if (orden === "a-z") {
      orderClause = [["nombre", "ASC"]];
    }

    // Ordenamiento de Z-A
    if (orden === "z-a") {
      orderClause = [["nombre", "DESC"]];
    }
    const propiedad = await Propiedad.findAll({
      where: whereClause,
      order: orderClause,
      include: [{ model: Propietario }, { model: ImagenVideo }],
    });

    const formatData = propiedad.map((item) => {
      return {
        cod_propiedad: item?.cod_propiedad,
        nombre: item?.nombre,
        tipo: item?.tipo,
        zona: item?.zona,
        direccion: item?.direccion,
        precio: item?.precio,
        estado: item?.estado,
        descripcion: item?.descripcion,
        caracteristicas: item?.caracteristicas,
        metraje: item?.metraje,
        propiedadHabilitada: item?.propiedadHabilitada,
        areaLibre: item?.areaLibre,
        cocheraAdicional: item?.cocheraAdicional,
        comision: item?.comision,
        observaciones: item?.observaciones,
        propietario: {
          cod_propietario: item?.propietario?.cod_propietario,
          nombre: item?.propietario?.nombre,
          dni: item?.propietario?.dni,
          celular: item?.propietario?.celular,
          direccion: item?.propietario?.direccion,
          titulo_propiedad: item?.propietario?.titulo_propiedad,
        },
        imagenVideos: item.imagenVideos,
      };
    });

    return res.status(200).json({ data: formatData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo obtener la lista de propiedades" });
  }
};

const post = async (req, res) => {
  try {
    let newPropiedadData = { ...req.body };

    // Eliminar los campos 'imagen' y 'video' del objeto newPropiedadData
    delete newPropiedadData.imagen;
    delete newPropiedadData.video;

    let newPropiedad = await Propiedad.create(newPropiedadData);

    // Procesar imágenes
    if (req.files && req.files.imagen) {
      // Si hay imágenes subidas
      for (let i = 0; i < req.files.imagen.length; i++) {
        let rutaImagen = process.env.LOCAL_IMAGE + req.files.imagen[i].filename;

        let newImagen = {
          url: rutaImagen,
          tipo: "imagen",
          cod_propiedad: newPropiedad.cod_propiedad,
        };

        await ImagenVideo.create(newImagen);
      }
    }

    // Procesar video
    if (req.files && req.files.video) {
      let newVideo;

      // Si el video es una URL de YouTube
      if (
        typeof req.files.video === "string" &&
        (req.files.video.startsWith("http") ||
          req.files.video.startsWith("https"))
      ) {
        newVideo = {
          url: req.files.video,
          tipo: "video",
          cod_propiedad: newPropiedad.cod_propiedad,
        };
      }
      // Si el video es un archivo
      else {
        let rutaVideo = process.env.LOCAL_IMAGE + req.files.video.filename;
        newVideo = {
          url: rutaVideo,
          tipo: "video",
          cod_propiedad: newPropiedad.cod_propiedad,
        };
      }

      await ImagenVideo.create(newVideo);
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
    let propiedadData = { ...req.body };

    // Eliminar los campos 'imagen' y 'video' del objeto propiedadData
    delete propiedadData.imagen;
    delete propiedadData.video;

    // Actualizar las propiedades básicas de la propiedad
    await Propiedad.update(propiedadData, { where: { cod_propiedad: id } });

    // Si hay archivos subidos, manejarlos
    if (req.files) {
      // Buscar y eliminar todas las entradas de ImagenVideo para esta propiedad
      let oldImagenesVideos = await ImagenVideo.findAll({
        where: { propiedadId: id },
      });
      for (let i = 0; i < oldImagenesVideos.length; i++) {
        // Aquí también podrías eliminar los archivos viejos del servidor si es necesario
        await oldImagenesVideos[i].destroy();
      }

      // Subir y crear entradas para los nuevos archivos
      for (let i = 0; i < req.files.length; i++) {
        let rutaImagenVideo = process.env.LOCAL_MEDIA + req.files[i].filename;
        let tipo = req.files[i].mimetype.startsWith("image/")
          ? "imagen"
          : "video";

        let newImagenVideo = {
          propiedadId: id,
          ruta: rutaImagenVideo,
          tipo: tipo,
        };
        await ImagenVideo.create(newImagenVideo);
      }
    }

    return res.status(200).json({ msg: "Propiedad actualizada con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo actualizar." });
  }
};

const delte = async (req, res) => {
  let id = req.params.id;

  try {
    // Buscar y eliminar todas las entradas de ImagenVideo para esta propiedad
    let imagenesVideos = await ImagenVideo.findAll({
      where: { cod_propiedad: id },
    });
    for (let i = 0; i < imagenesVideos.length; i++) {
      // Aquí también podrías eliminar los archivos del servidor si es necesario
      await imagenesVideos[i].destroy();
    }

    // Después de eliminar todas las imágenes y videos, eliminar la propiedad
    await Propiedad.destroy({ where: { cod_propiedad: id } });
    return res.status(200).json({ msg: "Propiedad eliminada con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo eliminar." });
  }
};

module.exports = { get, post, update, delte };
