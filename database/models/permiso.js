"use strict"


module.exports = (sequelize, DataTypes) =>{

    let Permiso = sequelize.define("permiso",{

    cod_permiso:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    permiso:{
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: false
    },

    createdAt:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull:false

    },
    updatedAt:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull:false

    },

    },{
        tableName: "permiso",
        freezeTableName: true
    })

    // Permiso.associate = models =>{
    //     Permiso.hasMany(models.permiso)
    // }

    return Permiso

}