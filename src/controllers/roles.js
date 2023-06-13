const db = require("../../database/models");

const get = async (req, res) => {
  try {
    const roles = await db.models.Rol.findAll({
      include: [
        {
          model: db.models.RolPermiso,
          include: [{ model: db.models.Permiso }],
        },
      ],
    });

    const formatRoles = roles.map((item) => {
      return {
        cod_rol: item.cod_rol,
        rol: item.rol,
        permisos: item.rol_permisos.map((ele) => {
          return {
            cod_permiso: ele.cod_permiso,
            permiso: ele.permiso.permiso,
            descripcion: ele.permiso.descripcion,
          };
        }),
      };
    });

    return res.status(200).json({ data: formatRoles });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo obtener la lista de roles" });
  }
};

const post = async (req, res) => {
  try {
    const id_rol = await db.models.Rol.create({ rol: req.body.rol });

    if (id_rol && req.body.cod_permiso) {
      const rol_permiso = req.body.cod_permiso.map((item) => {
        return {
          cod_rol: id_rol.cod_rol,
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
  let id = req.params.id;
  try {
    await db.models.Rol.update(req.body, { where: { cod_rol: id } });
    return res.status(200).json({ msg: "Rol actualizado con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo actualizar el rol." });
  }
};

const delte = async (req, res) => {
  let id = req.params.id;

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
    console.log(id);
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
  post,
  update,
  delte,
  postRolPermisos,
  updateRolPermisos,
};
