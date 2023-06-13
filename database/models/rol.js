"use strict"


module.exports = (sequelize, DataTypes) =>{

    let Rol = sequelize.define("rol",
    {

    cod_rol:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    rol:{
        type: DataTypes.STRING,
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
        tableName: "rol",
        freezeTableName: true
    })

    // Rol.associate = models =>{
    //     Rol.hasMany(models.Usuario)
    //     Rol.hasMany(models.RolPermiso)

    // }

    return Rol

}