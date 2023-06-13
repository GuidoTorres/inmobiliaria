"use strict"


module.exports = (sequelize, DataTypes) =>{

    let RolPermiso = sequelize.define("rol_permiso",{

    cod_rol_permiso:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    cod_permiso:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    createdAt:{
        type: DataTypes.DATE,
        field: "created_at",
        defaultValue: DataTypes.NOW,
        allowNull:false

    },
    updatedAt:{
        type: DataTypes.DATE,
        field: "updated_at",
        defaultValue: DataTypes.NOW,
        allowNull:false

    },

    },{
        tableName: "rol_permiso",
        freezeTableName: true
    })

    // RolPermiso.associate = models =>{
    //     RolPermiso.belongsTo(models.rol)
    //     RolPermiso.belongsTo(models.permiso)
    // }

    return RolPermiso

}