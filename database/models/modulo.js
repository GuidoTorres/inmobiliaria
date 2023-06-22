"use strict"
module.exports = (sequelize, DataTypes) =>{

    let Modulo = sequelize.define("modulo",
    {

    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: false
    },

    },{
        tableName: "modulo",
        freezeTableName: true
    })

    // Rol.associate = models =>{
    //     Rol.hasMany(models.Usuario)
    //     Rol.hasMany(models.RolPermiso)

    // }

    return Modulo

}