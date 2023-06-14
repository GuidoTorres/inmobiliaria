const dayjs = require("dayjs");
const db = require("../../database/models");
const { Usuario, Rol, Venta, Propiedad } = db.models;
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

    const formatData = cliente.map(item => {
      return{

        cod_cliente: item?.cod_usuario,
        nombre: item?.nombre,
        dni: item?.dni,
        correo: item?.correo,
        celular: item?.celular,
        cod_rol: item?.rol?.cod_rol,
        rol: item?.rol?.rol,
        estado: item?.estado
      }
    })
    return res.status(200).json({ data: formatData });
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
      where: { cod_rol: 5 },
      include: [
        {
          model: Venta,
          as: "VentasComoCliente",
          include: [{ model: Propiedad }, { model: Usuario, as: "Trabajador" }],
        },
      ],
    });

    const formatData = cliente.map((item) => {
      const propiedad = item.VentasComoCliente.map((ele) => ele.propiedad);
      const trabajador = item.VentasComoCliente.map((ele) => ele.Trabajador);

      return {
        cod_usuario: item?.cod_usuario,
        nombre: item?.nombre,
        dni: item?.dni,
        corre: item?.correo,
        celular: item?.celular,
        estado: true,
        cod_rol: item?.cod_rol,
        rol: item?.rol?.rol,
        createdAt: dayjs(item?.createdAt)?.format("DD-MM-YYYY"),
        updatedAt: dayjs(item?.createdAt)?.format("DD-MM-YYYY"),
        propiedad: {
          cod_propiedad: propiedad.cod_propiedad,
          nombre: propiedad.nombre,
        },
        propiedad: propiedad
          .map((data) => {
            return {
              cod_trabajador: data.cod_propiedad,
              nombre: data.nombre,
            };
          })
          .at(0),

        trabajador: trabajador
          .map((data) => {
            return {
              cod_trabajador: data.cod_usuario,
              nombre: data.nombre,
            };
          })
          .at(0),
        // cod_trabajador:item?.venta?.usuario?.nombre
      };
    });
    return res.status(200).json({ data: formatData });
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
    console.log(info);
    const prueba = await Venta.create(info);
    console.log(prueba);
    return res
      .status(200)
      .json({ msg: "Cliente trabajado registrado con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo registrar el cliente." });
  }
};
const updateClienteTrabajado = async (req, res) => {
  try {
    const { id } = req.params; // ID del cliente trabajado que se va a actualizar.
    const { cod_trabajador, cod_propiedad, nombre, dni, celular, correo } = req.body;

    // Busca el cliente trabajado.
    const usuario = await Usuario.findOne({ where: { cod_usuario: id } });

    // Si el cliente trabajado no se encuentra, devuelve un error.
    if (!usuario) {
      return res.status(404).json({ msg: "No se encontró el cliente." });
    }

    // Actualiza el cliente trabajado.
    await usuario.update({
      nombre: nombre,
      dni: dni,
      celular: celular,
      correo: correo,
    });

    // Busca la venta asociada a este cliente trabajado y la actualiza.
    const venta = await Venta.findOne({ where: { cod_cliente: id } });

    // Si no se encuentra la venta, devuelve un error.
    if (!venta) {
      return res.status(404).json({ msg: "No se encontró la venta asociada al cliente." });
    }

    // Actualiza la venta.
    await venta.update({
      cod_propiedad: cod_propiedad,
      cod_trabajador: cod_trabajador,
    });

    return res.status(200).json({ msg: "Cliente trabajado actualizado con éxito!" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo actualizar el cliente trabajado." });
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
  delteClienteTrabajado,
};
