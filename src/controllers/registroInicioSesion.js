const dayjs = require("dayjs");
const db = require("../../database/models");
const { Usuario, RegistroInicioSesion } = db.models;
const get = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      where:{cod_rol: 2},
      include: [{ model: RegistroInicioSesion }],
    });
    const formatData = usuarios.flatMap((usuario, i) => 
      usuario.registro_inicio_sesions.map((ingreso, a) => ({
        cod_usuario: usuario.cod_usuario,
        nombre: usuario.nombre,
        fecha_ingreso: usuario.fecha_ingreso,
        hora_ingreso: ingreso.hora_ingreso,
      }))
    ).sort((a, b) => {
      const fechaA = dayjs(a.fecha_ingreso, "dd-mm-YYYY");
      const fechaB = dayjs(b.fecha_ingreso, "dd-mm-YYYY");
    
      if (fechaA.isBefore(fechaB)) {
        return -1;
      } else if (fechaA.isAfter(fechaB)) {
        return 1;
      } else {
        // Las fechas son iguales, ordenar por hora_ingreso
        return a.hora_ingreso.localeCompare(b.hora_ingreso);
      }
    }).map((item, i) => {
      return{
        id: i+1,
        ...item
      }
    });

    return res.status(200).json({ data: formatData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo obtener el registro de ingreso." });
  }
};


module.exports = { get };
