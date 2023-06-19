const dayjs = require("dayjs");
const db = require("../../database/models");
const { Usuario, RegistroInicioSesion } = db.models;
const get = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      include: [{ model: RegistroInicioSesion }],
    });

    const formatData = usuarios.flatMap(usuario => 
      usuario.registro_inicio_sesions.map(ingreso => ({
        cod_usuario: usuario.cod_usuario,
        nombre: usuario.nombre,
        fecha_ingreso: dayjs(ingreso.fecha_ingreso).format("DD-MM-YYYY"),
        hora_ingreso: ingreso.hora_ingreso,
      }))
    );

    return res.status(200).json({ data: formatData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo obtener el registro de ingreso." });
  }
};


module.exports = { get };
