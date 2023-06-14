"use strict";

module.exports = (sequelize, DataTypes) => {
  let TrabajadorPropiedad = sequelize.define(
    "trabajador_propiedad",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      cod_trabajador: {
        type: DataTypes.INTEGER,
      },
      cod_propiedad: {
        type: DataTypes.INTEGER,
      },
      estadoActivo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      valorizacion: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      tasacion: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      cotizado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      exportado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      vendido: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      tableName: "trabajador_propiedad",
      freezeTableName: true,
    }
  );

  // RolPermiso.associate = models =>{
  //     RolPermiso.belongsTo(models.rol)
  //     RolPermiso.belongsTo(models.permiso)
  // }

  return TrabajadorPropiedad;
};
