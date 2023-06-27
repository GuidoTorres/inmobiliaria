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
      const fechaA = new Date(a.fecha_ingreso); const fechaB = new Date(b.fecha_ingreso);
      if (fechaA.getTime() === fechaB.getTime()) {
        return b.hora_ingreso.localeCompare(a.hora_ingreso);
      }
      
      // Si no, ordenar por fecha de mayor a menor
      return fechaB - fechaA;
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
