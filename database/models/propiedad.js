"use strict"


module.exports = (sequelize, DataTypes) =>{

    let Propiedad = sequelize.define("propiedad",{

    cod_propiedad:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    zona:{
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull:false
    },
    precio: {
        type: DataTypes.STRING,
        allowNull:false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull:false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull:false
    },
    caracteristicas: {
        type: DataTypes.STRING,
        allowNull:false
    },
    metraje: {
        type: DataTypes.STRING,
        allowNull:false
    },
    propiedadHabilitada: {
        type: DataTypes.BOOLEAN,
        allowNull:false
    },
    areaLibre: {
        type: DataTypes.STRING,
        allowNull:false
    },
    cocheraAdicional: {
        type: DataTypes.BOOLEAN,
        allowNull:false
    },
    comision: {
        type: DataTypes.STRING,
        allowNull:false
    },
    observaciones: {
        type: DataTypes.STRING,
        allowNull:false
    },

    cod_propietario: {
        type: DataTypes.INTEGER,
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
        tableName: "propiedad",
        freezeTableName: true
    })

    // Propiedad.associate = models =>{

    //     Propiedad.hasOne(models.cotizacion)
    //     Propiedad.belongsTo(models.propietario)

    // }

    return Propiedad

}