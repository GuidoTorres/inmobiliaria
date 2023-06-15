const db = require("../../database/models");
const { Cotizacion, Usuario, Propiedad, ImagenVideo } = db.models;

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
        { model: Propiedad, include: [{ model: ImagenVideo }] },
      ],
    });
    const formatData = cotizacion.map((item) => {
      return {
        cod_cotizacion: item.cod_cotizacion,
        fecha_emision: item.fecha_emision,
        fecha_vencimiento: item.fecha_vencimiento,
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
        },
        propiedad: item.propiedad,
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
    } = req.body;

    let nuevoUsuario = {
      cod_cliente: cod_cliente,
      fecha_emision: fecha_emision,
      fecha_vencimiento: fecha_vencimiento,
      cod_propiedad: cod_propiedad,
      cod_trabajador: cod_trabajador,
    };

    await Cotizacion.create(nuevoUsuario);
    return res.status(200).json({ msg: "Cotización registrada con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo registrar la contizacion." });
  }
};

const update = async (req, res) => {
  let id = req.params.id;

  try {
    const { fecha_emision, fecha_vencimiento, cod_propiedad } = req.body;

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
    });

    if (!cotizacion) {
      return res.status(404).json({ msg: "No se encontró la cotización." });
    }
    await Cotizacion.destroy({ where: { cod_cotizacion: id } });

    return res.status(200).json({ msg: "Cotización eliminada con éxito!" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar la cotización." });
  }
};

module.exports = { get, post, update,delte };
