"use strict"


module.exports = (sequelize, DataTypes) =>{

    let Cotizacion = sequelize.define("cotizacion",{

    cod_cotizacion:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    fecha_emision:{
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_vencimiento:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cod_cliente: {
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
    updateddAt:{
        type: DataTypes.DATE,
        field: "updated_at",
        defaultValue: DataTypes.NOW,
        allowNull:false

    },

    },{
        tableName: "cotizacion",
        freezeTableName: true
    })

    // Cotizacion.associate = models =>{

    //     Cotizacion.belongsTo(models.cliente )
    //     Cotizacion.belongsTo(models.agente )
    //     Cotizacion.belongsTo(models.propiedad)
    // }

    return Cotizacion

}