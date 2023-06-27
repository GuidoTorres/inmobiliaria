const dayjs = require("dayjs");
const db = require("../../database/models");
const { Usuario, RegistroInicioSesion } = db.models;
const get = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      where:{cod_rol: 2},
      include: [{ model: RegistroInicioSesion }],
    });
    let iteracion = 1; 
    const formatData = usuarios.flatMap((usuario) =>
    usuario.registro_inicio_sesions.map((ingreso, a) => {
      const item = {
        nro: iteracion, // Agregar el número de iteración consecutivo
        id: iteracion,
        cod_usuario: usuario.cod_usuario,
        nombre: usuario.nombre,
        fecha_ingreso: dayjs(ingreso.fecha_ingreso).format("DD-MM-YYYY"),
        hora_ingreso: ingreso.hora_ingreso,
      };
  
      iteracion++; // Incrementar el número de iteración para la siguiente iteración
  
      return item;
    })
  )
  // .sort((a, b) => {
  //     const fechaA = dayjs(a.fecha_ingreso, "DD-MM-YYYY");
  //     const fechaB = dayjs(b.fecha_ingreso, "DD-MM-YYYY");
    
  //     if (fechaA.isBefore(fechaB)) {
  //       return -1;
  //     } else if (fechaA.isAfter(fechaB)) {
  //       return 1;
  //     } else {
  //       // Las fechas son iguales, ordenar por hora_ingreso
  //       return a.hora_ingreso.localeCompare(b.hora_ingreso);
  //     }
  //   });

    return res.status(200).json({ data: formatData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo obtener el registro de ingreso." });
  }
};


module.exports = { get };
