const db = require("../../database/models");
const { encrypt } = require("./auth");
const { Usuario, Rol } = db.models;

const get = async (req, res) => {
  try {
    const usuario = await Usuario.findAll({ include: { model: Rol } });

    const formatUsuario = usuario.map((item) => {
      return {
        cod_usuario: item?.cod_usuario,
        nombre: item?.nombre,
        dni: item?.dni,
        correo: item?.correo,
        celular: item?.celular,
        contrasenia: item?.password,
        rol: item?.rol,
      };
    });
    return res.status(200).json({ data: formatUsuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo obtener la lista de usuarios." });
  }
};

const post = async (req, res) => {
  try {
    const { cod_rol, password, nombre, dni, celular, correo, oficina, estado } = req.body;

    let nuevoUsuario = {
      nombre: nombre,
      dni: dni,
      celular: celular,
      correo: correo,
      password: await encrypt(password),
      cod_rol: cod_rol,
    };

    if ((cod_rol == 1 || cod_rol == 2) && oficina !== null) {
      nuevoUsuario.oficina = oficina;
    } else if (cod_rol == 3 && estado !== null) {
      nuevoUsuario.estado = estado;
    }
    

    const usuario = await Usuario.create(nuevoUsuario);
    return res
      .status(200)
      .json({ msg: "Usuario registrado con éxito!", data: usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo registrar el usuario." });
  }
};

const update = async (req, res) => {
  let id = req.params.id;
  try {
    const { cod_rol, password, nombre, dni, celular, correo, oficina, estado } = req.body;

    let nuevoUsuario = {
      nombre: nombre,
      dni: dni,
      celular: celular,
      correo: correo,
      // password: await encrypt(password),
      cod_rol: cod_rol,
    };

    if ((cod_rol == 1 || cod_rol == 2) && oficina !== null) {
      nuevoUsuario.oficina = oficina;
    } else if (cod_rol == 3 && estado !== null) {
      nuevoUsuario.estado = false;
    };
    await Usuario.update(nuevoUsuario, { where: { cod_usuario: id } });
    return res.status(200).json({ msg: "Usuario actualizado con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo actualizar el usuario." });
  }
};

const delte = async (req, res) => {
  let id = req.params.id;

  try {
    await Usuario.destroy({ where: { cod_usuario: id } });
    return res.status(200).json({ msg: "Usuario eliminado con éxito!" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar el usuario." });
  }
};

module.exports = { get, post, update, delte };
