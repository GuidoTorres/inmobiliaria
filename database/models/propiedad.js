"use strict";

module.exports = (sequelize, DataTypes) => {
  let Propiedad = sequelize.define(
    "propiedad",
    {
      cod_propiedad: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tipo: {
        type: DataTypes.STRING,
      },
      zona: {
        type: DataTypes.STRING,
      },
      direccion: {
        type: DataTypes.STRING,
      },
      precio: {
        type: DataTypes.STRING,
      },
      estado: {
        type: DataTypes.STRING,
      },
      descripcion: {
        type: DataTypes.STRING,
      },
      caracteristicas: {
        type: DataTypes.STRING,
      },
      metraje: {
        type: DataTypes.FLOAT,
      },
      propiedadHabilitada: {
        type: DataTypes.BOOLEAN,
      },
      areaLibre: {
        type: DataTypes.FLOAT,
      },
      cocheraAdicional: {
        type: DataTypes.BOOLEAN,
      },
      comision: {
        type: DataTypes.FLOAT,
      },
      observaciones: {
        type: DataTypes.STRING,
      },
      video: {
        type: DataTypes.STRING,
      },
      creado_por: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cod_propietario: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      tableName: "propiedad",
      freezeTableName: true,
    }
  );

  return Propiedad;
};
