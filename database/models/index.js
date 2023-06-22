const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config");

const cotizacion = require("./cotizacion");
const imagenVideo = require("./ImagenVideo");
const permiso = require("./permiso");
const propiedad = require("./propiedad");
const propietario = require("./propietario");
const registroInicioSesion = require("./registroInicioSesion");
const rol = require("./rol");
const rolPermiso = require("./rolPermiso");
const usuario = require("./usuario");
const venta = require("./venta");
const trabajadorPropiedad = require("./trabajadorPropiedad");
const modulos = require("./modulo");

const sequelize = new Sequelize(config.development);

const db ={}
db.sequelize = sequelize
db.models = {}
db.models.Rol = rol(sequelize, DataTypes)
db.models.Permiso = permiso(sequelize, DataTypes)
db.models.RolPermiso = rolPermiso(sequelize, DataTypes)
db.models.Usuario = usuario(sequelize, DataTypes)
db.models.RegistroInicioSesion = registroInicioSesion(sequelize, DataTypes)
db.models.Cotizacion = cotizacion(sequelize, DataTypes)
db.models.Propiedad = propiedad(sequelize, DataTypes)
db.models.Propietario = propietario(sequelize, DataTypes)
db.models.ImagenVideo = imagenVideo(sequelize, DataTypes)
db.models.Venta = venta(sequelize, DataTypes)
db.models.TrabajadorPropiedad = trabajadorPropiedad(sequelize, DataTypes)
db.models.Modulo = modulos(sequelize, DataTypes)

// Configuración de las asociaciones
const {Modulo,TrabajadorPropiedad, Venta, Usuario, RegistroInicioSesion, Rol, Permiso, Cliente, Cotizacion, Propiedad, Propietario, RolPermiso, Agente, ImagenVideo } = db.models;
Usuario.hasMany(RegistroInicioSesion, { foreignKey: "cod_usuario" });
RegistroInicioSesion.belongsTo(Usuario, {foreignKey: "cod_usuario"})

Rol.hasMany(RolPermiso, { foreignKey: "cod_rol" });
Permiso.hasMany(RolPermiso, {foreignKey: "cod_permiso"})
RolPermiso.belongsTo(Rol, { foreignKey: "cod_rol" });
RolPermiso.belongsTo(Permiso, { foreignKey: "cod_permiso" });
Rol.hasMany(Usuario, {foreignKey: "cod_rol"})
Usuario.belongsTo(Rol, { foreignKey: "cod_rol" });

Modulo.hasMany(Permiso, {foreignKey: 'cod_modulo' });
Permiso.belongsTo(Modulo, {foreignKey: 'cod_modulo' });

Usuario.hasMany(Cotizacion, { as: 'CotizacionCliente', foreignKey: 'cod_cliente' });
Cotizacion.belongsTo(Usuario, { as: 'Cliente', foreignKey: 'cod_cliente' });

Usuario.hasMany(Cotizacion, { as: 'CotizacionTrabajador', foreignKey: 'cod_trabajador' });
Cotizacion.belongsTo(Usuario, { as: 'Trabajador', foreignKey: 'cod_trabajador' });

Usuario.hasMany(Venta, { as: 'VentasComoTrabajador', foreignKey: 'cod_trabajador' });
Venta.belongsTo(Usuario, { as: 'Trabajador', foreignKey: 'cod_trabajador' });

Usuario.hasMany(Venta, { as: 'VentasComoCliente', foreignKey: 'cod_cliente' });
Venta.belongsTo(Usuario, { as: 'Cliente', foreignKey: 'cod_cliente' });

Propiedad.hasMany(Venta, {foreignKey: 'cod_propiedad'});
Venta.belongsTo(Propiedad, {foreignKey: 'cod_propiedad'});

Usuario.hasMany(TrabajadorPropiedad, { foreignKey: "cod_trabajador" });
TrabajadorPropiedad.belongsTo(Usuario, { foreignKey: "cod_trabajador" });

Propiedad.hasMany(TrabajadorPropiedad, { foreignKey: "cod_propiedad" });
TrabajadorPropiedad.belongsTo(Propiedad, { foreignKey: "cod_propiedad" });

Propietario.hasMany(Propiedad, { foreignKey: "cod_propietario" });
Propiedad.belongsTo(Propietario, { foreignKey: "cod_propietario" });

Propiedad.hasMany(Cotizacion, { foreignKey: "cod_propiedad" });
Cotizacion.belongsTo(Propiedad, { foreignKey: "cod_propiedad" });

Propiedad.hasMany(ImagenVideo, {foreignKey:"cod_propiedad"})
ImagenVideo.belongsTo(Propiedad,{foreignKey: "cod_propiedad"})


module.exports= db