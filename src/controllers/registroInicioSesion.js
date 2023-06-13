const dayjs = require("dayjs");
const db = require("../../database/models");
const { Usuario, RegistroInicioSesion } = db.models;

const get = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      include: [{ model: RegistroInicioSesion }],
    });

    const formatData = usuarios.map(item =>{

      return{
        cod_usuario: item?.cod_usuario,
        nombre: item?.nombre,
        ingreso: item.registro_inicio_sesions.map(ele =>{
          return{
            fecha_ingreso: dayjs(ele.fecha_ingreso).format("DD-MM-YYYY"),
            hora_ingreso: ele.hora_ingreso
          }
        })

      }
    })

    return res.status(200).json({ data: formatData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo obtener el registro de ingreso." });
  }
};

module.exports = { get };
