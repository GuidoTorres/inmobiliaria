const db = require("../../database/models");
const ExcelJS = require("exceljs");

const { Propietario, Propiedad } = db.models;
const get = async (req, res) => {
  try {
    const propietario = await Propietario.findAll();
    const formatData = propietario.map((item) => {
      return {
        cod_propietario: item?.cod_propietario,
        nombre: item?.nombre,
        dni: item?.dni,
        celular: item?.celular,
        direccion: item?.direccion,
        titulo_propiedad: item?.titulo_propiedad,
      };
    });
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
    const propietario = await Propietario.findOne({
      where: { dni: newPropietarioData.dni },
    });

    if (propietario) {
      return res.status(404).json({ msg: "El DNI ya esta registrado." });
    }
    // Verificar si se subió una imagen
    if (req.file) {
      // Concatenar la ruta de la imagen al nombre del archivo
      newPropietarioData.titulo_propiedad =
        process.env.LOCAL_TITLE + req.file.filename;
    }

    await Propietario.create(newPropietarioData);
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

    const propietario = await Propietario.findOne({
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

    await Propietario.update(updateData, {
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
    const propietario = await Propietario.findOne({
      where: { cod_propietario: id },
    });

    if (!propietario) {
      return res.status(404).json({ msg: "No se encontró el propietario." });
    }

    const propiedades = await Propiedad.findAll({
      where: { cod_propietario: id },
    });

    if (propiedades && propiedades.length > 0) {
      return res
        .status(400)
        .json({
          msg: "El propietario tiene propiedades asociadas. No puede ser eliminado.",
        });
    }

    await Propietario.destroy({ where: { cod_propietario: id } });
    return res.status(200).json({ msg: "Propietario eliminado con éxito!" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar." });
  }
};

const descargarPropietarios = async (req, res) => {
  try {
    const propietario = await Propietario.findAll();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Hoja1");
    worksheet.getCell('A1').value = 'Nombre';
    worksheet.getCell('B1').value = 'Dni';
    worksheet.getCell('C1').value = 'Dirección';
    worksheet.getCell('D1').value = 'Celular';

    propietario.forEach((item, index) => {
      const rowIndex = index + 3; // Comenzar desde la fila 2 para dejar espacio para los encabezados
      worksheet.getCell(`A${rowIndex}`).value = item.nombre;
      worksheet.getCell(`B${rowIndex}`).value = item.dni;
      worksheet.getCell(`C${rowIndex}`).value = item.direccion;
      worksheet.getCell(`D${rowIndex}`).value = item.celular;

    });
    
    // Guardar el archivo Excel
    const buffer = await workbook.xlsx.writeBuffer();

    // Configurar las cabeceras de la respuesta para la descarga del archivo
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=propietarios.xlsx');
    res.setHeader('Content-Length', buffer.length);

    // Enviar el archivo como respuesta
    res.send(buffer);


  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "No se pudo obtener la lista de propietarios" });
  }
};

module.exports = { get, post, update, delte, descargarPropietarios };
