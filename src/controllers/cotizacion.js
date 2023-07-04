const db = require("../../database/models");
const {
  Cotizacion,
  Usuario,
  Propiedad,
  ImagenVideo,
  Propietario,
  TrabajadorPropiedad,
} = db.models;
const fs = require("fs");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const pdf = require("html-pdf");
const path = require("path");
const puppeteer = require("puppeteer");
const get = async (req, res) => {
  try {
    const { fecha_emision, fecha_vencimiento } = req.query;

    let whereClause = {};
    if (fecha_emision) {
      whereClause.fecha_emision = fecha_emision;
    }
    if (fecha_vencimiento) {
      whereClause.fecha_vencimiento = fecha_vencimiento;
    }
    const cotizacion = await Cotizacion.findAll({
      where: whereClause,
      include: [
        { model: Usuario, as: "Cliente" },
        { model: Usuario, as: "Trabajador" },

        {
          model: Propiedad,
          include: [{ model: Propietario }, { model: ImagenVideo }],
        },
      ],
    });
    const formatData = cotizacion.map((item) => {
      let propiedad = {
        ...item.propiedad.toJSON(),
        imagenes: item.propiedad.imagenVideos,
      };

      delete propiedad.imagenVideos;
      return {
        cod_cotizacion: item.cod_cotizacion,
        fecha_emision: item.fecha_emision,
        fecha_vencimiento: item.fecha_vencimiento,
        creado_por: item?.creado_por,
        cliente: {
          cod_cliente: item.Cliente.cod_usuario,
          nombre: item.Cliente.nombre,
          dni: item.Cliente.dni,
          correo: item.Cliente.correo,
          celular: item.Cliente.celular,
        },
        trabajador: {
          cod_trabajador: item.Trabajador.cod_usuario,
          nombre: item.Trabajador.nombre,
          dni: item.Trabajador.dni,
          correo: item.Trabajador.correo,
          celular: item.Trabajador.celular,
          oficina: item.Trabajador.oficina,
        },
        propiedad: propiedad,
      };
    });
    return res.status(200).json({ data: formatData });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "No se pudo obtener la lista de cotizaciones." });
  }
};

const post = async (req, res) => {
  try {
    const {
      cod_cliente,
      fecha_emision,
      fecha_vencimiento,
      cod_propiedad,
      cod_trabajador,
      creado_por,
    } = req.body;

    let nuevoUsuario = {
      cod_cliente: cod_cliente,
      fecha_emision: fecha_emision,
      fecha_vencimiento: fecha_vencimiento,
      cod_propiedad: cod_propiedad,
      cod_trabajador: cod_trabajador,
      creado_por: cod_trabajador,
    };

    await Cotizacion.create(nuevoUsuario);
    await TrabajadorPropiedad.update(
      { cotizado: true },
      { where: { cod_propiedad: cod_propiedad } }
    );

    return res.status(200).json({ msg: "Cotización registrada con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo registrar la cotizacion." });
  }
};

const update = async (req, res) => {
  let id = req.params.id;

  try {
    const {
      fecha_emision,
      fecha_vencimiento,
      cod_propiedad,
      cod_trabajador,
      cod_cliente,
    } = req.body;

    const cotizacion = await Cotizacion.findOne({
      where: { cod_cotizacion: id },
    });

    if (!cotizacion) {
      return res.status(404).json({ msg: "No se encontró la cotización." });
    }

    let actualizar = {
      fecha_emision: fecha_emision,
      fecha_vencimiento: fecha_vencimiento,
      cod_propiedad: cod_propiedad,
      cod_trabajador: cod_trabajador,
      cod_cliente: cod_cliente,
    };

    await Cotizacion.update(actualizar, { where: { cod_cotizacion: id } });
    return res.status(200).json({ msg: "Cotización actualizada con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo actualizar la contizacion." });
  }
};

const delte = async (req, res) => {
  let id = req.params.id;

  try {
    const cotizacion = await Cotizacion.findOne({
      where: { cod_cotizacion: id },
      // include:[{model:Propiedad}]
    });
    if (!cotizacion) {
      return res.status(404).json({ msg: "No se encontró la cotización." });
    }

    await TrabajadorPropiedad.update(
      { cotizado: false },
      { where: { cod_propiedad: cotizacion.cod_propiedad } }
    );
    await Cotizacion.destroy({ where: { cod_cotizacion: id } });

    return res.status(200).json({ msg: "Cotización eliminada con éxito!" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar la cotización." });
  }
};

const descargarCotizacion = async (req, res) => {
  let id = req.params.id;
  try {
    const cotizacion = await Cotizacion.findOne({
      where: { cod_cotizacion: id },
      include: [
        { model: Usuario, as: "Cliente" },
        { model: Usuario, as: "Trabajador" },
        {
          model: Propiedad,
          include: [{ model: Propietario }, { model: ImagenVideo }],
        },
      ],
    });

    if (!cotizacion) {
      return res.status(404).json({ msg: "No se encontro la cotización." });
    }

    let propiedad = {
      ...cotizacion?.propiedad?.toJSON(),
      imagenes: cotizacion?.propiedad?.imagenVideos,
    };
    delete propiedad?.imagenVideos;

    let imagenesBase64 = [];
    for (let imagen of propiedad?.imagenes) {
      try {
        // Obtiene el nombre del archivo de la URL
        const url = new URL(imagen.dataValues.url);
        const imageName = path.basename(url.pathname);
        // Ruta del archivo de imagen en el sistema de archivos
        const imagePath = path.join(
          __dirname,
          "../../upload/imagenesVideos",
          imageName
        );

        // Leer el archivo de imagen como un buffer
        const imageBuffer = fs.readFileSync(imagePath);

        // Convertir el buffer a una cadena base64
        const base64Image = imageBuffer.toString("base64");

        // Agregar la cadena base64 a la matriz
        imagenesBase64.push("data:image/jpeg;base64," + base64Image);
      } catch (error) {
        console.error(`Error leyendo el archivo de imagen `);
        // Continúa con la siguiente iteración del ciclo
        continue;
      }
    }
    propiedad.imagenesBase64 = imagenesBase64;

    const formatData = {
      cod_cotizacion: cotizacion.cod_cotizacion,
      fecha_emision: cotizacion.fecha_emision,
      fecha_vencimiento: cotizacion.fecha_vencimiento,
      creado_por: cotizacion?.creado_por,
      cliente: {
        cod_cliente: cotizacion.Cliente.cod_usuario,
        nombre: cotizacion.Cliente.nombre,
        dni: cotizacion.Cliente.dni,
        correo: cotizacion.Cliente.correo,
        celular: cotizacion.Cliente.celular,
      },
      trabajador: {
        cod_trabajador: cotizacion.Trabajador.cod_usuario,
        nombre: cotizacion.Trabajador.nombre,
        dni: cotizacion.Trabajador.dni,
        correo: cotizacion.Trabajador.correo,
        celular: cotizacion.Trabajador.celular,
        oficina: cotizacion.Trabajador.oficina,
      },
      propiedad: propiedad,
    };
    const imagePath = path.join(__dirname, "../../assets/images/bg-doc.png");
    const ubiacionPlantilla = require.resolve("../../views/cotizacion.html");
    const imageData = fs.readFileSync(imagePath);
    // Convertir el buffer de la imagen a base64
    const base64Image = Buffer.from(imageData).toString("base64");
    let contenidoHtml = fs.readFileSync(ubiacionPlantilla, "utf8");
    // Compila la plantilla de Handlebars
    const template = handlebars.compile(contenidoHtml);
    const data = {
      formatData: formatData,
      base64: "data:image/png;base64," + base64Image,
    };
    // Genera el HTML final a partir de la plantilla y los datos
    const htmlFinal = template(data);
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: "new",
    });
    const page = await browser.newPage();
    await page.setContent(htmlFinal);
    const options = {
      path: path.join(__dirname, "../../upload/pdf/cotizacion.pdf"),
      format: "A4",
      printBackground: true,
    };
    try {
      await page.pdf(options);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
    await browser.close();

    // Envía el PDF como respuesta
    res.download(options.path);
    await TrabajadorPropiedad.update(
      { exportado: true },
      {
        where: {
          cod_trabajador: formatData.trabajador.cod_usuario,
          cod_propiedad: formatData.propiedad.cod_propiedad,
        },
      }
    );
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo descargar la cotización." });
  }
};

const cotizacionPorCorreo = async (req, res, next) => {
  let id = req.params.id;
  try {
    const cotizacion = await Cotizacion.findOne({
      where: { cod_cotizacion: id },
      include: [
        { model: Usuario, as: "Cliente" },
        { model: Usuario, as: "Trabajador" },
        {
          model: Propiedad,
          include: [{ model: Propietario }, { model: ImagenVideo }],
        },
      ],
    });
    if (!cotizacion) {
      return res.status(404).json({ msg: "No se encontro la cotización." });
    }

    let propiedad = {
      ...cotizacion.propiedad.toJSON(),
      imagenes: cotizacion.propiedad.imagenVideos,
    };
    delete propiedad.imagenVideos;

    let imagenesBase64 = [];
    for (let imagen of propiedad.imagenes) {
      try {
        // Obtiene el nombre del archivo de la URL
        const url = new URL(imagen.dataValues.url);
        const imageName = path.basename(url.pathname);

        // Ruta del archivo de imagen en el sistema de archivos
        const imagePath = path.join(
          __dirname,
          "../../upload/imagenesVideos",
          imageName
        );

        // Leer el archivo de imagen como un buffer
        const imageBuffer = fs.readFileSync(imagePath);

        // Convertir el buffer a una cadena base64
        const base64Image = imageBuffer.toString("base64");

        // Agregar la cadena base64 a la matriz
        imagenesBase64.push("data:image/jpeg;base64," + base64Image);
      } catch (error) {
        console.error(`Error leyendo el archivo de imagen `);
        // Continúa con la siguiente iteración del ciclo
        continue;
      }
    }
    propiedad.imagenesBase64 = imagenesBase64;

    const formatData = {
      cod_cotizacion: cotizacion.cod_cotizacion,
      fecha_emision: cotizacion.fecha_emision,
      fecha_vencimiento: cotizacion.fecha_vencimiento,
      creado_por: cotizacion?.creado_por,
      cliente: {
        cod_cliente: cotizacion.Cliente.cod_usuario,
        nombre: cotizacion.Cliente.nombre,
        dni: cotizacion.Cliente.dni,
        correo: cotizacion.Cliente.correo,
        celular: cotizacion.Cliente.celular,
      },
      trabajador: {
        cod_trabajador: cotizacion.Trabajador.cod_usuario,
        nombre: cotizacion.Trabajador.nombre,
        dni: cotizacion.Trabajador.dni,
        correo: cotizacion.Trabajador.correo,
        celular: cotizacion.Trabajador.celular,
        oficina: cotizacion.Trabajador.oficina,
      },
      propiedad: propiedad,
    };

    const imagePath = path.join(__dirname, "../../assets/images/bg-doc.png");
    const ubiacionPlantilla = require.resolve("../../views/cotizacion.html");
    const imageData = fs.readFileSync(imagePath);

    // Convertir el buffer de la imagen a base64
    const base64Image = Buffer.from(imageData).toString("base64");

    let contenidoHtml = fs.readFileSync(ubiacionPlantilla, "utf8");

    // Compila la plantilla de Handlebars
    const template = handlebars.compile(contenidoHtml);
    const data = {
      formatData: formatData,
      base64: "data:image/png;base64," + base64Image,
    };
    // Genera el HTML final a partir de la plantilla y los datos
    const htmlFinal = template(data);
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: "new",
    });
    const page = await browser.newPage();
    await page.setContent(htmlFinal);
    const options = {
      path: path.join(__dirname, "../../upload/pdf/cotizacion.pdf"),
      format: "A4",
      printBackground: true,
    };
    try {
      await page.pdf(options);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
    await browser.close();
    // Lee el contenido del PDF generado
    const pdfContent = await fs.promises.readFile(options.path);

    var transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: '"Inmobiliara Roca Rey" <support@example.com>', // sender address
        to: formatData.cliente.correo,
        subject: "Cotizacion de la propiedad ...", // Subject line
        attachments: [
          {
            filename: "cotizacion.pdf",
            content: pdfContent,
            contentType: "application/pdf",
          },
        ],
      });

      return res.status(200).json({ msg: "El correo se envió correctamente." });
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      return res.status(500).json({ error: "Error al enviar el correo." });
    }

    // const pdf = await generarPDF(htmlFinal);
  } catch (error) {
    console.log(error);

    if (error.message === "Failed to send email") {
      console.log(error);

      return res.status(500).json({ msg: "No se pudo enviar la cotización." });
    } else {
      console.log(error);
      return res.status(500).json({ msg: "No se pudo enviar la cotización." });
    }
  }
};

module.exports = {
  get,
  post,
  update,
  delte,
  descargarCotizacion,
  cotizacionPorCorreo,
};
