const dayjs = require("dayjs");
const db = require("../../database/models");
const { Usuario, Rol, Venta, Propiedad } = db.models;
const { encrypt } = require("./auth");
const { Op, where } = require("sequelize");
const {
  checkEmailInUse,
  checkDniInUse,
} = require("../../helpers/validacionUsuario");
const { checkUserExists } = require("../../helpers/validacionUsuarioUpdate");

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
    const emailInUse = await checkEmailInUse(correo);
    const dniInUse = await checkDniInUse(dni);

    if (emailInUse) {
      return res.status(400).json({ msg: "El correo ya está registrado." });
    }
    if (dniInUse) {
      return res.status(400).json({ msg: "El DNI ya está registrado." });
    }

    let nuevoUsuario = {
      nombre: nombre,
      dni: dni,
      celular: celular,
      correo: correo,
      password: password ? await encrypt(password) : null,
      estado: false,
      cod_rol: 3,
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
    const emailInUse = await checkEmailInUseUpdate(id, correo);
    const dniInUse = await checkDniInUseUpdate(id, dni);
    if (emailInUse) {
      return res.status(400).json({ msg: "El correo ya está registrado." });
    }

    if (dniInUse) {
      return res.status(400).json({ msg: "El DNI ya está registrado." });
    }

    let nuevoUsuario = {
      nombre: nombre,
      dni: dni,
      celular: celular,
      correo: correo,
      estado: false,
      cod_rol: 3,
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
    const user = await Usuario.findByPk(id);
    if (!user) {
      return res.status(404).json({ msg: "No se encontró el cliente." });
    }
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
      where: { tipo: "Posible cliente" },
      include: [{ model: Rol }],
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
        creado_por: item?.creado_por,
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
    const { nombre, dni, celular, correo, creado_por } = req.body;

    const emailInUse = await checkEmailInUse(correo);
    const dniInUse = await checkDniInUse(dni);


    if (emailInUse) {
      return res.status(400).json({ msg: "El correo ya está en uso." });
    }
    if (dniInUse) {
      return res.status(400).json({ msg: "El DNI ya está en uso." });
    }

    let nuevoUsuario = {
      nombre: nombre,
      dni: dni,
      celular: celular,
      correo: correo,
      estado: false,
      cod_rol: 3,
      tipo: "Posible cliente",
      creado_por: creado_por,
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

    const existeusuario = await checkUserExists(id);
    const existeCorreo = await checkEmailInUse(id, correo);
    const existeDNI = await checkDniInUse(id, dni);

    if (!existeusuario) {
      return res.status(400).json({ msg: "El cliente no está registrado." });
    }
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
const updatePosibleClienteaTrabajado = async (req, res) => {
  let id = req.params.id;
  try {
    const { cod_propiedad, cod_trabajador, nombre, dni, celular, correo } =
      req.body;

    const user = await checkUserExists(id);
    const propiedad = await Propiedad.findByPk(cod_propiedad);
    const trabajador = await Usuario.findByPk(cod_trabajador);

    if (!user) {
      return res.status(400).json({ msg: "El cliente no esta registrado." });
    }
    if (!propiedad) {
      return res.status(400).json({ msg: "No se encontro la propiedad." });
    }
    if (propiedad.estado === "vendida") {
      return res.status(400).json({ msg: "La propiedad ya ha sido vendida." });
    }
    if (!trabajador) {
      return res.status(400).json({ msg: "No se encontro el cod_trabajador." });
    }

    let nuevoUsuario = {
      correo: correo,
      estado: true,
      tipo: "Cliente trabajado",
    };
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
};

// REGISTRO DE CLIENTE TRABAJADO NO ACCEDE AL SISTEMA
const getClienteTrabajado = async (req, res) => {
  try {
    const cliente = await Usuario.findAll({
      where: { tipo: "Cliente trabajado" },
      include: [
        { model: Rol },
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
        creado_por: item?.creado_por,
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
    const {
      cod_trabajador,
      cod_propiedad,
      nombre,
      dni,
      celular,
      correo,
      creado_por,
    } = req.body;

    // const userCount = await countUsers();
    // const emailInUse = await checkEmailInUse(correo);
    // const dniInUse = await checkDniInUse(dni);

    // if (emailInUse) {
    //   return res.status(400).json({ msg: "El correo ya está en uso." });
    // }

    // if (dniInUse) {
    //   return res.status(400).json({ msg: "El DNI ya está en uso." });
    // }

    let nuevoUsuario = {
      nombre: nombre,
      dni: dni,
      celular: celular,
      correo: correo,
      cod_rol: 3,
      estado: true,
      tipo: "Cliente trabajado",
      creado_por: creado_por,
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
    const cod_cliente = parseInt(req.params.cod_cliente);
    const cod_venta = parseInt(req.params.cod_venta);
    const { cod_trabajador, cod_propiedad, nombre, dni, celular, correo } =
      req.body;

    // const userCount = await countUsers();
    // const existeCorreo = await checkEmailInUse(correo);
    // const existeDNI = await checkDniInUse(dni);
    // if (userCount >= 10) {
    //   return res.status(400).json({ msg: "El correo ya está registrado." });
    // }

    // if (existeCorreo) {
    //   return res.status(400).json({ msg: "El correo ya está registrado." });
    // }

    // if (existeDNI) {
    //   return res.status(400).json({ msg: "El DNI ya está registrado." });
    // }
    // Start the transaction.
    const t = await db.sequelize.transaction();

    try {
      const usuario = await Usuario.findOne(
        { where: { cod_usuario: cod_cliente } },
        { transaction: t }
      );

      if (!usuario) {
        await t.rollback();
        return res.status(404).json({ msg: "No se encontró el cliente." });
      }
      const venta = await Venta.findOne(
        { where: { id: cod_venta } },
        { transaction: t }
      );

      if (!venta) {
        await t.rollback();
        return res
          .status(404)
          .json({ msg: "No se encontró la venta asociada al cliente." });
      }

      await usuario.update(
        {
          nombre: nombre,
          dni: dni,
          celular: celular,
          correo: correo,
          estado: true,
        },
        { transaction: t }
      );

      await venta.update(
        {
          cod_propiedad: cod_propiedad,
          cod_trabajador: cod_trabajador,
          cod_cliente: cod_cliente,
        },
        { transaction: t }
      );

      await t.commit();

      return res
        .status(200)
        .json({ msg: "Cliente trabajado actualizado con éxito!" });
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
  const cod_cliente = parseInt(req.params.cod_cliente);
  const cod_venta = parseInt(req.params.cod_venta);

  try {
    const user = await checkUserExists(cod_cliente);
    if (!user) {
      return res.status(404).json({ msg: "No se encontró el cliente." });
    }
    let nuevoUsuario = {
      estado: false,
      tipo: "Posible cliente",
    };

    const getVenta = await Venta.findOne({where:{id:cod_venta}})

    await Propiedad.update(
      { estado: "activo", propiedadHabilitada: true },
      { where: { cod_propiedad: getVenta.cod_propiedad } }
    );
    
    await Venta.destroy({
      where: { id: cod_venta },
    });
    await Usuario.update(nuevoUsuario, { where: { cod_usuario: cod_cliente } });


    return res.status(200).json({ msg: "Cliente eliminado con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo eliminar el cliente." });
  }
};
const getAllClients = async (req, res) =>{

 try {
  const cliente = await Usuario.findAll({
    where: {
      tipo: {
        [Op.not]: null,
      },
    },
  });

  const formatData = cliente.map(item => {
    return{
      cod_cliente: item.cod_usuario,
      nombre: item.nombre,
      dni: item.dni,
      correo: item.correo,
      celular: item.celular
    }
  })
  return res.status(200).json({ data: formatData });
} catch (error) {
  console.log(error);
  res.status(500).json({ msg: "No se pudo obtener la lista de clientes" });
}

}

module.exports = {
  get,
  post,
  update,
  delte,
  getAllClients,
  getPosibleCliente,
  postPosibleCliente,
  updatePosibleCliente,
  getClienteTrabajado,
  postClienteTrabajado,
  updateClienteTrabajado,
  delteClienteTrabajado,
  updatePosibleClienteaTrabajado,
};
