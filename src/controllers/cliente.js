const dayjs = require("dayjs");
const { Op } = require("sequelize");
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

    const existeCorreo = await Usuario.findOne({ where: { correo } });
    const existeDNI = await Usuario.findOne({ where: { dni } });

    if (existeCorreo) {
      return res.status(400).json({ msg: "El correo ya está registrado." });
    }

    if (existeDNI) {
      return res.status(400).json({ msg: "El DNI ya está registrado." });
    }

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
    const existeCorreo = await Usuario.findOne({ where: { correo } });
    const existeDNI = await Usuario.findOne({ where: { dni } });

    if (existeCorreo) {
      return res.status(400).json({ msg: "El correo ya está registrado." });
    }

    if (existeDNI) {
      return res.status(400).json({ msg: "El DNI ya está registrado." });
    }

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

    const formatData = cliente.map((item) => {
      return {
        cod_cliente: item?.cod_usuario,
        nombre: item?.nombre,
        dni: item?.dni,
        correo: item?.correo,
        celular: item?.celular,
        cod_rol: item?.rol?.cod_rol,
        rol: item?.rol?.rol,
        estado: item?.estado,
      };
    });
    return res.status(200).json({ data: formatData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo obtener la lista de clientes" });
  }
};
const postPosibleCliente = async (req, res) => {
  try {
    const { nombre, dni, celular, correo } = req.body;

    // Verificar si el correo electrónico ya está en uso
    const emailInUse = await Usuario.findOne({
      where: { correo: correo },
    });
    if (emailInUse) {
      return res.status(400).json({ msg: "El correo ya está en uso." });
    }

    // Verificar si el DNI ya está en uso
    const dniInUse = await Usuario.findOne({
      where: { dni: dni },
    });
    if (dniInUse) {
      return res.status(400).json({ msg: "El DNI ya está en uso." });
    }

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

    const existeusuario = await Usuario.findOne({ where: { cod_usuario: id} } );

    if (!existeusuario) {
      return res.status(400).json({ msg: "El cliente no está registrado." });
    }
    const existeCorreo = await Usuario.findOne({ where: { correo, cod_usuario: { [Op.ne]: id } } });
    const existeDNI = await Usuario.findOne({ where: { dni, cod_usuario: { [Op.ne]: id } } });

    if (existeCorreo) {
      return res.status(400).json({ msg: "El correo ya está registrado." });
    }

    if (existeDNI) {
      return res.status(400).json({ msg: "El DNI ya está registrado." });
    }

    await Usuario.update(nuevoUsuario, { where: { cod_usuario: id } });
    return res.status(200).json({ msg: "Cliente actualizado con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo actualizar el cliente." });
  }
};
const updatePosibleClienteaTrabajado = async(req,res)=>{
  let id = req.params.id;
  try {
    const {cod_propiedad, cod_trabajador, nombre, dni, celular, correo } = req.body;

    let nuevoUsuario = {
      correo: correo,
      cod_rol: 5,
      estado: true,
    };
    const user = await Usuario.findOne({ where: { cod_usuario: id } });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "El cliente no esta registrado." });
    }

    await Usuario.update(nuevoUsuario, { where: { cod_usuario: id } });

    const info = {
      cod_cliente: id,
      cod_propiedad: cod_propiedad,
      cod_trabajador: cod_trabajador,
    };
    await Venta.create(info);
    return res.status(200).json({ msg: "Cliente actualizado con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo actualizar el cliente." });
  }

}

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
      const cod_venta = item?.VentasComoCliente?.map((ele) => ele?.id);
      const propiedad = item?.VentasComoCliente?.map((ele) => ele?.propiedad);
      const trabajador = item?.VentasComoCliente?.map((ele) => ele?.Trabajador);

      return {
        cod_cliente: item?.cod_usuario,
        nombre: item?.nombre,
        dni: item?.dni,
        correo: item?.correo,
        celular: item?.celular,
        estado: true,
        cod_rol: item?.cod_rol,
        rol: item?.rol?.rol,
        cod_venta: Number(cod_venta),
        propiedad: propiedad
          ?.map((data) => {
            return {
              cod_propiedad: data?.cod_propiedad,
              nombre: data?.nombre,
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

          // Verificar si el correo electrónico ya está en uso
    const emailInUse = await Usuario.findOne({ where: { correo: correo } });
    if (emailInUse) {
      return res
        .status(400)
        .json({ msg: "El correo electrónico ya está en uso." });
    }

    // Verificar si el DNI ya está en uso
    const dniInUse = await Usuario.findOne({ where: { dni: dni } });
    if (dniInUse) {
      return res.status(400).json({ msg: "El DNI ya está en uso." });
    }

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
    const cod_cliente = parseInt(req.params.cod_cliente)
    const cod_venta = parseInt(req.params.cod_venta)
    const { cod_trabajador, cod_propiedad, nombre, dni, celular, correo } =
      req.body;


      const existeCorreo = await Usuario.findOne({ where: { correo, cod_usuario: { [Op.ne]: cod_cliente } } });
      const existeDNI = await Usuario.findOne({ where: { dni, cod_usuario: { [Op.ne]: cod_cliente } } });
  
  
      if (existeCorreo) {
        return res.status(400).json({ msg: "El correo ya está registrado." });
      }
  
      if (existeDNI) {
        return res.status(400).json({ msg: "El DNI ya está registrado." });
      }
    // Start the transaction.
    const t = await db.sequelize.transaction();

    try {
      const usuario = await Usuario.findOne({ where: { cod_usuario: cod_cliente } }, { transaction: t });

      if (!usuario) {
        await t.rollback();
        return res.status(404).json({ msg: "No se encontró el cliente." });
      }
      const venta = await Venta.findOne({ where: { id: cod_venta } }, { transaction: t });

      if (!venta) {
        await t.rollback();
        return res.status(404).json({ msg: "No se encontró la venta asociada al cliente." });
      }

      await usuario.update({
        nombre: nombre,
        dni: dni,
        celular: celular,
        correo: correo,
        estado: true
      }, { transaction: t });



      await venta.update({
        cod_propiedad: cod_propiedad,
        cod_trabajador: cod_trabajador,
        cod_cliente: cod_cliente
      }, { transaction: t });

      await t.commit();

      return res.status(200).json({ msg: "Cliente trabajado actualizado con éxito!" });
    } catch (error) {
      await t.rollback();
      throw error;
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "No se pudo actualizar el cliente trabajado." });
  }
};
const delteClienteTrabajado = async (req, res) => {
  const cod_cliente = parseInt(req.params.cod_cliente)
  const cod_venta = parseInt(req.params.cod_venta)

  try {
    const user = await Usuario.findByPk(cod_cliente);
    console.log(user);
    if (!user) {
      return res.status(404).json({ msg: "No se encontró el cliente." });
    }
    await Venta.destroy({
      where: { cod_cliente: cod_venta },
    });
    await Usuario.destroy({
      where: { cod_usuario: cod_cliente },
    });

    return res.status(200).json({ msg: "Cliente eliminado con éxito!" });
  } catch (error) {
    console.log(error);
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
  updatePosibleClienteaTrabajado
};
