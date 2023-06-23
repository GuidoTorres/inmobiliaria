const db = require("../../database/models");
const {Rol, RolPermiso, Permiso, Modulo} = db.models
const get = async (req, res) => {
  try {
    const roles = await Rol.findAll({
      include: [
        {
          model: RolPermiso,
          include: [{ model: Permiso, include:[{model:Modulo}] }],
        },
      ],
    });

    // Mapeamos los roles y sus permisos
    const formatRoles = roles.map((item) => {
      let permisosByCategoria = {};

      item.rol_permisos.forEach((permiso) => {
        if (!permisosByCategoria[permiso.permiso.modulo.nombre]) {
          permisosByCategoria[permiso.permiso.modulo.nombre] = {
            cod_categoria: permiso.permiso.modulo.cod_modulo,
            categoria: permiso.permiso.modulo.nombre,
            permisos_categoria: [],
          };
        }

        permisosByCategoria[permiso.permiso.modulo.nombre].permisos_categoria.push({
          cod_permiso: permiso.cod_permiso,
          permiso: permiso.permiso.permiso,
          descripcion: permiso.permiso.descripcion,
          key: permiso.permiso.key,
        });
      });

      // Convertir el objeto a un array para el formato de respuesta
      let permisosArray = Object.values(permisosByCategoria);

      return {
        cod_rol: item.cod_rol,
        rol: item.rol,
        permisos: permisosArray,
      };
    });

    return res.status(200).json({ data: formatRoles });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo obtener la lista de roles" });
  }
};

const getById = async (req, res) => {
  const id = req.params.id;

  try {
    const roles = await Rol.findAll({
      where:{cod_rol:id},
      include: [
        {
          model: RolPermiso,
          include: [{ model: Permiso, include:[{model:Modulo}] }],
        },
      ],
    });

    // Mapeamos los roles y sus permisos
    const formatRoles = roles.map((item) => {
      let permisosByCategoria = {};

      item.rol_permisos.forEach((permiso) => {
        if (!permisosByCategoria[permiso.permiso.modulo.nombre]) {
          permisosByCategoria[permiso.permiso.modulo.nombre] = {
            cod_categoria: permiso.permiso.modulo.cod_modulo,
            categoria: permiso.permiso.modulo.nombre,
            permisos_categoria: [],
          };
        }

        permisosByCategoria[permiso.permiso.modulo.nombre].permisos_categoria.push({
          cod_permiso: permiso.cod_permiso,
          permiso: permiso.permiso.permiso,
          descripcion: permiso.permiso.descripcion,
          key: permiso.permiso.key,
        });
      });

      // Convertir el objeto a un array para el formato de respuesta
      let permisosArray = Object.values(permisosByCategoria);

      return {
        cod_rol: item.cod_rol,
        rol: item.rol,
        permisos: permisosArray,
      };
    });

    return res.status(200).json({ data: formatRoles });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo obtener la lista de roles" });
  }
};


const post = async (req, res) => {
  try {
    const { rol } = req.body;

    // Check if the role already exists.
    const existingRole = await db.models.Rol.findOne({ where: { rol } });

    if (existingRole) {
      return res.status(400).json({ msg: "El rol ya existe." });
    }

    const createdRole = await db.models.Rol.create({ rol});

    if (createdRole && req.body.cod_permiso) {
      const rol_permiso = req.body.cod_permiso.map((item) => {
        return {
          cod_rol: createdRole.cod_rol,
          cod_permiso: item,
        };
      });
      await db.models.RolPermiso.bulkCreate(rol_permiso);
    }

    return res.status(200).json({ msg: "Rol registrado con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo registrar el rol." });
  }
};


const update = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { id } = req.params;
    const { rol, cod_permiso } = req.body;

    // Check if the role exists.
    const existingRole = await db.models.Rol.findByPk(id);
    if (!existingRole) {
      await transaction.rollback();
      return res.status(404).json({ msg: "El rol no existe." });
    }

    // Check if the new role already exists.
    if (existingRole.rol !== rol) {
      const duplicateRole = await db.models.Rol.findOne({ where: { rol } });
      if (duplicateRole) {
        await transaction.rollback();
        return res.status(400).json({ msg: "El rol ya existe." });
      }
    }

    await existingRole.update({ rol }, { transaction });

    // If there are permissions, update them.
    if (cod_permiso && Array.isArray(cod_permiso)) {
      // Delete old associations.
      await db.models.RolPermiso.destroy({
        where: { cod_rol: id },
        transaction,
      });

      // Create new associations.
      const newPermissions = cod_permiso.map((item) => ({
        cod_rol: id,
        cod_permiso: item,
      }));
      await db.models.RolPermiso.bulkCreate(newPermissions, { transaction });
    }

    await transaction.commit();
    return res.status(200).json({ msg: "Rol actualizado con éxito!" });
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    res.status(500).json({ msg: "No se pudo actualizar el rol." });
  }
};


const delte = async (req, res) => {
  let id = req.params.id;

  if(id === "1" || id === "2" || id === "3") {
    return res.status(403).json({ msg: "Este rol no puede ser eliminado." });
  }
  try {
    await db.models.Rol.destroy({ where: { cod_rol: id } });
    return res.status(200).json({ msg: "Rol eliminado con éxito!" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar el rol." });
  }
};

const postRolPermisos = async (req, res) => {
  let cod_rol = req.params.id;

  try {
    const rol_permiso = req.body.cod_permiso.map((item) => {
      return {
        cod_rol: cod_rol,
        cod_permiso: item,
      };
    });
    await db.models.RolPermiso.bulkCreate(rol_permiso);
    return res.status(200).json({ msg: "Permisos asignados correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo asignar los permisos." });
  }
};
const updateRolPermisos = async (req, res) => {
  try {
    const { id } = req.params;
    const { cod_permiso } = req.body;
    // Eliminar todos los permisos asociados con el rol
    await db.models.RolPermiso.destroy({ where: { cod_rol: id } });



    // Agregar los nuevos permisos
    if (cod_permiso) {
      const rol_permiso = cod_permiso.map((item) => {
        return {
          cod_rol: id,
          cod_permiso: item,
        };
      });
      await db.models.RolPermiso.bulkCreate(rol_permiso);
    }

    return res.status(200).json({ msg: "Rol actualizado con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo actualizar el rol." });
  }
};

module.exports = {
  get,
  getById,
  post,
  update,
  delte,
  postRolPermisos,
  updateRolPermisos,
};
