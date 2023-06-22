"use strict";

module.exports = (sequelize, DataTypes) => {
  let Permiso = sequelize.define(
    "permiso",
    {
      cod_permiso: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      permiso: {
        type: DataTypes.STRING,
      },
      descripcion: {
        type: DataTypes.STRING,
      },
      key: {
        type: DataTypes.STRING,
      },
      cod_modulo: {
        type: DataTypes.INTEGER,
      },

      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      tableName: "permiso",
      freezeTableName: true,
    }
  );

  // Permiso.associate = models =>{
  //     Permiso.hasMany(models.permiso)
  // }

  return Permiso;
};
