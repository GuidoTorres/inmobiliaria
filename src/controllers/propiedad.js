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
    if (req.body.video) {
      let newVideo;

      // Asumimos que el video siempre será una URL de YouTube
      newVideo = {
        url: req.body.video,
        tipo: "video",
        cod_propiedad: newPropiedad.cod_propiedad,
      };

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
    let propiedad = await Propiedad.findOne({ where: { cod_propiedad: id } });
    if (!propiedad) {
      return res.status(404).json({ msg: "No se encontró la propiedad." });
    }
    let propiedadData = { ...req.body };
    delete propiedadData.imagen;
    delete propiedadData.video;

    // Actualizar las propiedades básicas de la propiedad
    await Propiedad.update(propiedadData, { where: { cod_propiedad: id } });

    // Si hay imágenes, manejarlas
    if (req.body.imagen || (req.files && req.files.imagen)) {
      // Obtén las rutas de las imágenes a conservar
      let imagenesParaConservar = req.body.imagen
        ? JSON.parse(req.body.imagen)
        : [];

      // Buscar todas las entradas de ImagenVideo para esta propiedad que sean de tipo imagen
      let allImagenes = await ImagenVideo.findAll({
        where: { cod_propiedad: id, tipo: "imagen" },
      });

      // Aquí podrías eliminar las imágenes que no están en la lista de imágenes a conservar
      for (let i = 0; i < allImagenes.length; i++) {
        if (!imagenesParaConservar.includes(allImagenes[i].ruta)) {
          // Aquí también podrías eliminar los archivos viejos del servidor si es necesario
          await allImagenes[i].destroy();
        }
      }

      // Subir y crear entradas para las nuevas imágenes
      if (req.files && req.files.imagen) {
        for (let i = 0; i < req.files.imagen.length; i++) {
          let rutaImagen =
            process.env.LOCAL_IMAGE + req.files.imagen[i].filename;
          let newImagen = {
            cod_propiedad: id,
            ruta: rutaImagen,
            tipo: "imagen",
          };
          await ImagenVideo.create(newImagen);
        }
      }
    }

    // Si hay un video subido, manejarlo
    if (req.body.video) {
      // Buscar y eliminar la entrada de ImagenVideo para este video
      let oldVideo = await ImagenVideo.findOne({
        where: { cod_propiedad: id, tipo: "video" },
      });
      if (oldVideo) {
        await oldVideo.destroy();
      }

      // Crear una entrada para el nuevo video
      let newVideo = {
        cod_propiedad: id,
        ruta: req.body.video,
        tipo: "video",
      };
      await ImagenVideo.create(newVideo);
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
    let propiedad = await Propiedad.findOne({ where: { cod_propiedad: id } });
    if (!propiedad) {
      return res.status(404).json({ msg: "No se encontró la propiedad." });
    }
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
