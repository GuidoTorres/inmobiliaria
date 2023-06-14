"use strict"


module.exports = (sequelize, DataTypes) =>{

    let Venta = sequelize.define("venta",
    {

    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    cod_cliente:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cod_propiedad:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    cod_trabajador:{
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
        tableName: "venta",
        freezeTableName: true
    })

    // Rol.associate = models =>{
    //     Rol.hasMany(models.Usuario)
    //     Rol.hasMany(models.RolPermiso)

    // }

    return Venta

}