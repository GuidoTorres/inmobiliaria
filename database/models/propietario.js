"use strict"


module.exports = (sequelize, DataTypes) =>{

    let Propietario = sequelize.define("propietario",{

    cod_propietario:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    dni: {
        type: DataTypes.STRING,
        allowNull:false
    },
    celular: {
        type: DataTypes.STRING,
        allowNull:false
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull:false
    },
    titulo_propiedad: {
        type: DataTypes.STRING,
        allowNull:false
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
        tableName: "propietario",
        freezeTableName: true
    })

    // Propietario.associate = models =>{
    //     Propietario.hasMany(models.propiedad)
    // }

    return Propietario

}