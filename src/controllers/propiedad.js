const dayjs = require("dayjs");
const db = require("../../database/models");
const { Propiedad, ImagenVideo, Propietario, TrabajadorPropiedad } = db.models;
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
        creado_por: item?.creado_por,
        video: item?.video,
        createdAt: dayjs(item?.createdAt).format("DD/MM/YYYY"),
        propietario: {
          cod_propietario: item?.propietario?.cod_propietario,
          nombre: item?.propietario?.nombre,
          dni: item?.propietario?.dni,
          celular: item?.propietario?.celular,
          direccion: item?.propietario?.direccion,
          titulo_propiedad: item?.propietario?.titulo_propiedad,
        },

        imagenes: item.imagenVideos,
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

    let { cod_propietario } = newPropiedadData;
    let {creado_por} = newPropiedadData

    // Validar el cod_propietario solo si existe
    if (cod_propietario) {
      let propietario = await Propietario.findOne({
        where: { cod_propietario },
      });
      if (!propietario) {
        return res
          .status(400)
          .json({ msg: "El cod_propietario proporcionado no es válido.." });
      }
    }
    delete newPropiedadData.imagen;

    let newPropiedad = await Propiedad.create(newPropiedadData);

    const trabajador_prop={
      cod_propiedad: newPropiedad.cod_propiedad,
      cod_trabajador: creado_por,
      tasacion: true,
      valorizacion: true
    }

    await TrabajadorPropiedad.create(trabajador_prop)

    if (req.fileValidationError) {
      return res.status(400).json({ error: req.fileValidationError });
    }

    // Procesar imágenes
    if (req.files && req.files.imagen) {
      // Si hay imágenes subidas
      for (let i = 0; i < req.files.imagen.length; i++) {
        let rutaImagen = process.env.LOCAL_IMAGE + req.files.imagen[i].filename;

        let newImagen = {
          url: rutaImagen,
          cod_propiedad: newPropiedad.cod_propiedad,
        };

        await ImagenVideo.create(newImagen);
      }
    }

    return res.status(200).json({ msg: "Propiedad registrada con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo registrar la propiedad." });
  }
};

let update = async (req, res) => {
  let id = req.params.id;
  try {
    let propiedad = await Propiedad.findOne({ where: { cod_propiedad: id } });
    if (!propiedad) {
      return res.status(404).json({ msg: "No se encontró la propiedad." });
    }
    let propiedadData = { ...req.body };

    let { cod_propietario } = propiedadData;

    // Validar el cod_propietario solo si existe
    if (cod_propietario) {
      let propietario = await Propietario.findOne({
        where: { cod_propietario },
      });
      if (!propietario) {
        return res
          .status(400)
          .json({ msg: "El cod_propietario proporcionado no es válido." });
      }
    }

    let idsImagenesParaConservar = [];
    if (propiedadData.imagenes) {
      if (typeof propiedadData.imagenes === "string") {
        idsImagenesParaConservar = propiedadData.imagenes
          .split(",")
          .map(Number);
      } else {
        idsImagenesParaConservar = JSON.parse(propiedadData.imagenes);
      }
    }
    delete propiedadData.imagen;
    if (req.fileValidationError) {
      return res
        .status(400)
        .json({ msg: "Una o varias de las imagenes sobrepasan los 5mb." });
    }

    // Actualizar las propiedades básicas de la propiedad
    delete propiedadData.imagenes;
    await Propiedad.update(propiedadData, { where: { cod_propiedad: id } });

    // Buscar todas las entradas de ImagenVideo para esta propiedad que sean de tipo imagen
    let allImagenes = await ImagenVideo.findAll({
      where: { cod_propiedad: id },
    });

    // Eliminar las imágenes que no están en la lista de imágenes a conservar
    for (let i = 0; i < allImagenes.length; i++) {
      if (!idsImagenesParaConservar.includes(allImagenes[i].id)) {
        // Aquí también podrías eliminar los archivos viejos del servidor si es necesario
        await allImagenes[i].destroy();
      }
    }

    // Subir y crear entradas para las nuevas imágenes
    if (req.files && req.files.imagen) {
      for (let i = 0; i < req.files.imagen.length; i++) {
        let rutaImagen = process.env.LOCAL_IMAGE + req.files.imagen[i].filename;
        let newImagen = { cod_propiedad: id, url: rutaImagen };
        await ImagenVideo.create(newImagen);
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

let updateHabilitado = async (req, res) => {
  let id = req.params.id;
  try {
    let propiedad = await Propiedad.findOne({ where: { cod_propiedad: id } });
    if (!propiedad) {
      return res.status(404).json({ msg: "No se encontró la propiedad." });
    }

    // Leer el valor actual del campo 'propiedadHabilitada'
    let estadoActual = propiedad.propiedadHabilitada;

    // Invertir el valor de 'propiedadHabilitada'
    let nuevoEstado = !estadoActual;

    // Actualizar el campo 'propiedadHabilitada' en la base de datos
    propiedad.propiedadHabilitada = nuevoEstado;
    await propiedad.save();

    return res.status(200).json({ msg: "Propiedad actualizada con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo actualizar." });
  }
};

let updateEstado = async (req, res) => {
  let id = req.params.id;
  try {
    let propiedad = await Propiedad.findOne({ where: { cod_propiedad: id } });
    if (!propiedad) {
      return res.status(404).json({ msg: "No se encontró la propiedad." });
    }

    // Leer el valor actual del campo 'propiedadHabilitada'
    let { estado } = req.body;

    // Actualizar el campo 'propiedadHabilitada' en la base de datos
    propiedad.estado = estado;

    if (propiedad.estado === "Vendido") {
      propiedad.vender = true;
    }

    await propiedad.save();

    return res.status(200).json({ msg: "Propiedad actualizada con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo actualizar." });
  }
};

module.exports = { get, post, update, delte, updateHabilitado, updateEstado };
