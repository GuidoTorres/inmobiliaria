"use strict";


module.exports = (sequelize, DataTypes) => {
  let RegistroInicioSesion = sequelize.define(
    "registro_inicio_sesion",
    {
      cod_registro: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      fecha_ingreso: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      hora_ingreso: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      cod_usuario: {
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
      tableName: "registro_inicio_sesion",
      freezeTableName: true,
    }
  );

  // RegistroInicioSesion.associate = (models) => {
  //   RegistroInicioSesion.belongsTo(models.usuario,{foreignKey:"cod_usuario"});

  // };

  return RegistroInicioSesion;
};