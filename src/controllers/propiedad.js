const dayjs = require("dayjs");
const { Op } = require("sequelize");
const db = require("../../database/models");
const {
  Propiedad,
  ImagenVideo,
  Propietario,
  TrabajadorPropiedad,
  Usuario,
  Rol,
} = db.models;
const path = require('path');
const handlebars = require("handlebars");
const pdf = require("html-pdf");
const fs = require("fs");
const { log } = require("console");


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
    let { creado_por } = newPropiedadData;

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

    const trabajador_prop = {
      cod_propiedad: newPropiedad.cod_propiedad,
      cod_trabajador: creado_por,
      tasacion: true,
      valorizacion: true,
    };

    await TrabajadorPropiedad.create(trabajador_prop);

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
    if (propiedad.estado === "vendida") {
      return res
        .status(400)
        .json({ msg: "No se puede actualizar una propiedad ya vendida." });
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
    if (propiedad.estado === "vendida") {
      return res
        .status(400)
        .json({ msg: "No se puede eliminar una propiedad ya vendida." });
    }
    // Buscar y eliminar todas las entradas de ImagenVideo para esta propiedad
    await ImagenVideo.destroy({
      where: { cod_propiedad: id },
    });

    await TrabajadorPropiedad.destroy({ where: { cod_propiedad: id } });

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

    if (propiedad.estado === "vendida") {
      return res
        .status(400)
        .json({ msg: "No se puede habilitar una propiedad ya vendida." });
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

    if (propiedad.estado === "vendida") {
      return res
        .status(400)
        .json({ msg: "No se puede actualizar una propiedad ya vendida." });
    }

    // Leer el valor actual del campo 'propiedadHabilitada'
    let { estado } = req.body;

    // Actualizar el campo 'propiedadHabilitada' en la base de datos
    propiedad.estado = estado;
    propiedad.propiedadHabilitada = false;
    // propiedad
    if (estado === "vendida") {
      await TrabajadorPropiedad.update(
        { vendido: true },
        { where: { cod_propiedad: id } }
      );
    }

    await propiedad.save();

    return res.status(200).json({ msg: "Propiedad actualizada con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo actualizar." });
  }
};

const getPropiedadCliente = async (req, res) => {
  try {
    const propiedad = await Propiedad.findAll({
      where: {
        propiedadHabilitada: true,
        estado: { [Op.ne]: "vendida" },
      },
      include: [{ model: Propietario }, { model: ImagenVideo }],
    });

    const formatData = await Promise.all(
      propiedad.map(async (item) => {
        // Obtenemos los datos del usuario que creó la propiedad
        const usuarioCreador = await Usuario.findOne({
          where: {
            cod_usuario: item.creado_por,
          },
        });

        let agente = null;
        if (usuarioCreador) {
          agente = {
            cod_agente: usuarioCreador.cod_usuario,
            nombre: usuarioCreador.nombre,
            dni: usuarioCreador.dni,
            correo: usuarioCreador.correo,
            celular: usuarioCreador.celular,
            oficina: usuarioCreador.oficina,
          };
        }

        return {
          cod_propiedad: item.cod_propiedad,
          nombre: item.nombre,
          tipo: item.tipo,
          zona: item.zona,
          direccion: item.direccion,
          precio: item.precio,
          estado: item.estado,
          descripcion: item.descripcion,
          caracteristicas: item.caracteristicas,
          metraje: item.metraje,
          propiedadHabilitada: item.propiedadHabilitada,
          areaLibre: item.areaLibre,
          cocheraAdicional: item.cocheraAdicional,
          comision: item.comision,
          observaciones: item.observaciones,
          agente: agente, // Agregamos los datos del usuario como "agente"
          video: item.video,
          createdAt: dayjs(item.createdAt).format("DD/MM/YYYY"),
          propietario: {
            cod_propietario: item.propietario.cod_propietario,
            nombre: item.propietario.nombre,
            dni: item.propietario.dni,
            celular: item.propietario.celular,
            direccion: item.propietario.direccion,
            titulo_propiedad: item.propietario.titulo_propiedad,
          },
          imagenes: item.imagenVideos,
        };
      })
    );

    return res.status(200).json({ data: formatData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo obtener la lista de propiedades" });
  }
};
const getPropiedadClienteById = async (req, res) => {
  let id = req.params.id;
  try {
    const usuario = await Usuario.findOne({
      where: { cod_usuario: id },
    });
    console.log(usuario);
    if (!usuario) {
      return res.status(404).json({ msg: "No se encontro el usuario." });
    }
    let propiedades;
    if (usuario.cod_rol === 1) {
      propiedades = await TrabajadorPropiedad.findAll({
        where: { cod_trabajador: usuario.cod_usuario },
        include: [
          {
            model: Propiedad,
            include: [
              {
                model: Propietario,
                where: {
                  propiedadHabilitada: true,
                  estado: { [Op.ne]: "vendida" },
                },
              },
              { model: ImagenVideo },
            ],
          },
        ],
      });
      // Realiza las operaciones necesarias con las propiedades obtenidas
    }

    if (usuario.cod_rol === 2) {
      propiedades = await TrabajadorPropiedad.findAll({
        where: { cod_trabajador: usuario.cod_usuario },
        include: [
          {
            model: Propiedad,
            where: {
              creado_por: usuario.cod_usuario,
              propiedadHabilitada: true,
              estado: { [Op.ne]: "vendida" },
            },
            include: [{ model: Propietario }, { model: ImagenVideo }],
          },
        ],
      });
    }

    if (!propiedades) {
      return res
        .status(404)
        .json({ msg: "No se encontraron propiedades del trabajador." });
    }

    let formatData = propiedades?.map((item) => {
      return {
        cod_propiedad: item?.propiedad?.cod_propiedad,
        nombre: item?.propiedad?.nombre,
        tipo: item?.propiedad?.tipo,
        zona: item?.propiedad?.zona,
        direccion: item?.propiedad?.direccion,
        precio: item?.propiedad?.precio,
        estado: item?.propiedad?.estado,
        descripcion: item?.propiedad?.descripcion,
        caracteristicas: item?.propiedad?.caracteristicas,
        metraje: item?.propiedad?.metraje,
        propiedadHabilitada: item?.propiedad?.propiedadHabilitada,
        areaLibre: item?.propiedad?.areaLibre,
        cocheraAdicional: item?.propiedad?.cocheraAdicional,
        comision: item?.propiedad?.comision,
        observaciones: item?.propiedad?.observaciones,
        video: item?.propiedad?.video,
        creado_por: item?.propiedad?.creado_por,
        createdAt: dayjs(item?.createdAt)?.format("DD/MM/YYYY"),
        agente: usuario, // Agregamos los datos del usuario como "agente"
        propietario: item?.propiedad?.propietario,
        imagenes: item?.propiedad?.imagenVideos,
      };
    });

    return res.status(200).json({ data: formatData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo obtener la lista de propiedades" });
  }
};
const getPropiedadByUser = async (req, res) => {
  let id = req.params.id;
  try {
    // Primero, obtenemos el usuario y su rol
    const usuario = await Usuario.findOne({
      where: { cod_usuario: id },
      include: [{ model: Rol }],
    });
    // console.log(usuario);
    if (!usuario) {
      return res
        .status(404)
        .json({ msg: "El usuario no se encuentra registrado en el sistema." });
    }

    const rol_usuario = usuario.cod_rol;
    let propiedad;
    if (rol_usuario === 1) {
      propiedad = await TrabajadorPropiedad.findAll({
        // where: { cod_trabajador: usuario.cod_usuario },
        include: [
          {
            model: Propiedad,
            where: {
              propiedadHabilitada: true,
              estado: { [Op.ne]: "vendida" },
            },
            include: [{ model: Propietario }, { model: ImagenVideo }],
          },
        ],
      });
    }
    if (rol_usuario === 2) {
      propiedad = await TrabajadorPropiedad.findAll({
        where: { cod_trabajador: usuario.cod_usuario },
        include: [
          {
            model: Propiedad,
            where: {
              creado_por: usuario.cod_usuario,

              propiedadHabilitada: true,
              estado: { [Op.ne]: "vendida" },
            },
            include: [{ model: Propietario }, { model: ImagenVideo }],
          },
        ],
      });
    }
    if (!propiedad) {
      return res
        .status(404)
        .json({ msg: "No se encontraron propiedades del trabajador." });
    }

    let formatData = propiedad?.map((item) => {
      return {
        cod_propiedad: item?.propiedad?.cod_propiedad,
        nombre: item?.propiedad?.nombre,
        tipo: item?.propiedad?.tipo,
        zona: item?.propiedad?.zona,
        direccion: item?.propiedad?.direccion,
        precio: item?.propiedad?.precio,
        estado: item?.propiedad?.estado,
        descripcion: item?.propiedad?.descripcion,
        caracteristicas: item?.propiedad?.caracteristicas,
        metraje: item?.propiedad?.metraje,
        propiedadHabilitada: item?.propiedad?.propiedadHabilitada,
        areaLibre: item?.propiedad?.areaLibre,
        cocheraAdicional: item?.propiedad?.cocheraAdicional,
        comision: item?.propiedad?.comision,
        observaciones: item?.propiedad?.observaciones,
        video: item?.propiedad?.video,
        creado_por: item?.propiedad?.creado_por,
        createdAt: dayjs(item?.createdAt)?.format("DD/MM/YYYY"),
        agente: {
          cod_agente: usuario.cod_usuario,
          nombre: usuario.nombre,
          dni: usuario.dni,
          correo: usuario.correo,
          celular: usuario.celular,
          oficina: usuario.oficina,
        }, // Agregamos los datos del usuario como "agente"
        propietario: item?.propiedad?.propietario,
        imagenes: item?.propiedad?.imagenVideos,
      };
    });

    return res.status(200).json({ data: formatData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo obtener la lista de propiedades" });
  }
};

const descargarPropiedad = async (req, res) => {
  let id = req.params.id;
  try {
    const propiedad = await Propiedad.findOne({
      where: { cod_propiedad: id },
      include: [{ model: Propietario }, { model: ImagenVideo }],
    });

    if (!propiedad) {
      return res.status(404).json({ msg: "No se encontraro la propiedad." });
    }

    let formatData = {

        cod_propiedad: propiedad?.cod_propiedad,
        nombre: propiedad?.nombre,
        tipo: propiedad?.tipo,
        zona: propiedad?.zona,
        direccion: propiedad?.direccion,
        precio: propiedad?.precio,
        estado: propiedad?.estado,
        descripcion: propiedad?.descripcion,
        caracteristicas: propiedad?.caracteristicas,
        metraje: propiedad?.metraje,
        propiedadHabilitada: propiedad?.propiedadHabilitada,
        areaLibre: propiedad?.areaLibre,
        cocheraAdicional: propiedad?.cocheraAdicional,
        comision: propiedad?.comision,
        observaciones: propiedad?.observaciones,
        video: propiedad?.video,
        creado_por: propiedad?.creado_por,
        createdAt: dayjs(propiedad?.createdAt)?.format("DD/MM/YYYY"),
        propietario: propiedad?.propietario,
        imagenes: propiedad?.imagenVideos,
    };

    const imagePath = path.join(__dirname, "../../assets/images/bg-doc.png");
    const ubiacionPlantilla = require.resolve("../../views/propiedad.html");
    const imageData = fs.readFileSync(imagePath);
    const base64Image = Buffer.from(imageData).toString("base64");
    const mimeType = path.extname(imagePath).replace(".", "");
    const base64 = `data:image/${mimeType};base64,${base64Image}`;

    let contenidoHtml = fs.readFileSync(ubiacionPlantilla, "utf8");

    // Compila la plantilla de Handlebars
    const template = handlebars.compile(contenidoHtml);
    const data = {
      formatData: formatData,
      base64: base64,
    };
    // Genera el HTML final a partir de la plantilla y los datos
    const htmlFinal = template(data);
    const options = {
      format: "A4",
      // Establece el tamaño del PDF como A4
      // Resto de opciones...
    };
    const pdfName = "propiedad.pdf"; // Establece el nombre del archivo PDF
    res.on('error', function(err) {
      console.error("An error occurred:", err);
    });
    console.log("apunto de entral al pdf");
    pdf.create(htmlFinal, options).toFile(path.join(__dirname, pdfName), (error, result) => {
      console.log("en el pdf");

      if (error) {
        console.log("Error creating PDF:", error);
        console.log("Result object:", result);
        res.status(500).send("Error creating PDF: " + error);
      } else {
        console.log("Successfully created PDF");
        res.download(result.filename);  // Esto enviará al cliente la URL de descarga del archivo
      }
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo obtener la lista de propiedades" });
  }
};

module.exports = {
  get,
  post,
  update,
  delte,
  updateHabilitado,
  updateEstado,
  getPropiedadCliente,
  getPropiedadClienteById,
  getPropiedadByUser,
  descargarPropiedad,
};
