const db = require("../../database/models");
const { Cotizacion, Rol } = db.models;

const { encrypt } = require("./auth");

const get = async (req, res) => {
  try {
    const cotizacion = await Cotizacion.findAll();
    return res.status(200).json({ data: cotizacion });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo obtener la lista de cotizaciones." });
  }
};

const post = async (req, res) => {
  try {
    const { cod_cliente, fecha_emision, fecha_vencimiento, cod_propiedad, cod_trabajador } =
      req.body;

    let nuevoUsuario = {
      cod_cliente: cod_cliente,
      fecha_emision: fecha_emision,
      fecha_vencimiento:fecha_vencimiento,
      cod_propiedad: cod_propiedad,
      cod_trabajador: cod_trabajador

    };

    await  Cotizacion.create(nuevoUsuario);
    return res.status(200).json({ msg: "Cotización registrada con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo registrar la contizacion." });
  }
};

module.exports={get, post}