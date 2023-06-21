const dayjs = require("dayjs");
const db = require("../../database/models");
const { Usuario, TrabajadorPropiedad, Propiedad } = db.models;
const get = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      include: [
        { model: TrabajadorPropiedad, include: [{ model: Propiedad }] },
      ],
    });

    const formatData = usuarios.map((item, i) => {
      return {
        id: i + 1,
        nombre: item?.nombre,
        propiedad: item?.trabajador_propiedads?.map((ele) => {
          return { nombre: ele?.propiedad?.nombre,
            tasacion: ele?.tasacion,
            valorizacion: ele?.valorizacion,
            cotizado: ele?.cotizado,
            exportado: ele?.exportado,
            vendido: ele?.vendido
          };
        }),
      };
    });

    return res.status(200).json({ data: formatData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo obtener el registro de ofertas." });
  }
};

module.exports = { get };
