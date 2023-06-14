const db = require("../../database/models");
const { Usuario, Rol, Venta } = db.models;
const { encrypt } = require("./auth");

// REGISTRO DE CLIENTE COMO USUARIO
const get = async (req, res) => {
  try {
    const cliente = await Usuario.findAll({
      where: { estado: false },
      include: [{ model: Rol, where: { rol: "Cliente" } }],
    });
    return res.status(200).json({ data: cliente });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo obtener la lista de clientes" });
  }
};
const post = async (req, res) => {
  try {
    const { cod_rol, password, nombre, dni, celular, correo } = req.body;

    let nuevoUsuario = {
      nombre: nombre,
      dni: dni,
      celular: celular,
      correo: correo,
      password: password ? await encrypt(password) : null,
      estado: false,
      cod_rol: cod_rol,
    };

    await Usuario.create(nuevoUsuario);
    return res.status(200).json({ msg: "Cliente registrado con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo registrar el Cliente." });
  }
};
const update = async (req, res) => {
  let id = req.params.id;
  try {
    const { cod_rol, password, nombre, dni, celular, correo } = req.body;

    let nuevoUsuario = {
      nombre: nombre,
      dni: dni,
      celular: celular,
      correo: correo,
      estado: false,
      cod_rol: cod_rol,
    };

    // Verifica si se proporciona una nueva contraseña
    if (password) {
      nuevoUsuario.password = await encrypt(password);
    }

    await Usuario.update(nuevoUsuario, { where: { cod_usuario: id } });
    return res.status(200).json({ msg: "Cliente actualizado con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo actualizar el cliente." });
  }
};
const delte = async (req, res) => {
  let id = req.params.id;

  try {
    await Usuario.destroy({
      where: { cod_usuario: id },
    });

    return res.status(200).json({ msg: "Cliente eliminado con éxito!" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar el cliente." });
  }
};

// REGISTRO DE POSIBLE CLIENTE NO ACCEDE AL SISTEMA

const getPosibleCliente = async (req, res) => {
  try {
    const cliente = await Usuario.findAll({
      include: [{ model: Rol, where: { cod_rol: 4 } }],
    });
    return res.status(200).json({ data: cliente });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo obtener la lista de clientes" });
  }
};
const postPosibleCliente = async (req, res) => {
  try {
    const { nombre, dni, celular, correo } = req.body;

    let nuevoUsuario = {
      nombre: nombre,
      dni: dni,
      celular: celular,
      correo: correo,
      estado: false,
      cod_rol: 4,
    };

    await Usuario.create(nuevoUsuario);

    return res.status(200).json({ msg: "Cliente registrado con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo registrar el cliente." });
  }
};
const updatePosibleCliente = async (req, res) => {
  let id = req.params.id;
  try {
    const { nombre, dni, celular, correo } = req.body;

    let nuevoUsuario = {
      nombre: nombre,
      dni: dni,
      celular: celular,
      correo: correo,
    };

    await Usuario.update(nuevoUsuario, { where: { cod_usuario: id } });
    return res.status(200).json({ msg: "Cliente actualizado con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo actualizar el cliente." });
  }
};

// REGISTRO DE CLIENTE TRABAJADO NO ACCEDE AL SISTEMA

const getClienteTrabajado = async (req, res) => {
  try {
    const cliente = await Usuario.findAll({
      include: [{ model: Rol, where: { cod_rol: 5 } }],
    });
    return res.status(200).json({ data: cliente });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo obtener la lista de clientes" });
  }
};
const postClienteTrabajado = async (req, res) => {
  try {
    const { cod_trabajador, cod_propiedad, nombre, dni, celular, correo } =
      req.body;

    let nuevoUsuario = {
      nombre: nombre,
      dni: dni,
      celular: celular,
      correo: correo,
      cod_rol: 5,
      estado: true,
    };

    const usuario = await Usuario.create(nuevoUsuario);

    const info = {
      cod_cliente: usuario.cod_usuario,
      cod_propiedad: cod_propiedad,
      cod_trabajador: cod_trabajador,
    };

    await Venta.create(info);
    return res
      .status(200)
      .json({ msg: "Cliente trabajado registrado con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo registrar el cliente." });
  }
};
const updateClienteTrabajado = async (req, res) => {
  let id = req.params.id;

  try {
    const { nombre, dni, celular, correo } = req.body;

    // Obtén el registro del cliente trabajado desde la base de datos
    const clienteTrabajado = await Usuario.findOne({cod_usuario: id});

    // Verifica si el cliente trabajado existe y si tiene permiso para ser modificado
    if (!clienteTrabajado) {
      return res.status(404).json({ msg: "Cliente no encontrado." });
    }

    // Realiza las actualizaciones necesarias en los campos del cliente trabajado
    clienteTrabajado.nombre = nombre || clienteTrabajado.nombre;
    clienteTrabajado.dni = dni || clienteTrabajado.dni;
    clienteTrabajado.celular = celular || clienteTrabajado.celular;
    clienteTrabajado.correo = correo || clienteTrabajado.correo;

    // Guarda los cambios actualizados en la base de datos
    await clienteTrabajado.save();

    return res.status(200).json({ msg: "Cliente trabajado actualizado con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo actualizar el cliente." });
  }
};
const delteClienteTrabajado = async (req, res) => {
  let id = req.params.id;

  try {
    await Venta.destroy({
      where: { cod_cliente: id },
    });
    await Usuario.destroy({
      where: { cod_usuario: id },
    });

    return res.status(200).json({ msg: "Cliente eliminado con éxito!" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar el cliente." });
  }
};

module.exports = {
  get,
  post,
  update,
  delte,
  getPosibleCliente,
  postPosibleCliente,
  updatePosibleCliente,
  getClienteTrabajado,
  postClienteTrabajado,
  updateClienteTrabajado,
  delteClienteTrabajado
};
