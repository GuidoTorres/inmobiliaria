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
        fecha_ingreso: dayjs(ingreso.fecha_ingreso).format("DD/MM/YYYY"),
        hora_ingreso: ingreso.hora_ingreso,
      }))
    ).sort((a, b) => {
      const fechaA = dayjs(a.fecha_ingreso, "DD/MM/YYYY");
      const fechaB = dayjs(b.fecha_ingreso, "DD/MM/YYYY");
    
      if (fechaA.isBefore(fechaB)) {
        return 1; // Cambiado de -1 a 1 para ordenar de mayor a menor
      } else if (fechaA.isAfter(fechaB)) {
        return -1; // Cambiado de 1 a -1 para ordenar de mayor a menor
      } else {
        // Las fechas son iguales, ordenar por hora_ingreso
        return a.hora_ingreso.localeCompare(b.hora_ingreso);
      }
    }).reverse().map((item, i) => {
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
