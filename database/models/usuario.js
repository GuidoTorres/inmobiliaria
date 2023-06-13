"use strict";

module.exports = (sequelize, DataTypes) => {
  let Usuario = sequelize.define(
    "usuario",
    {
      cod_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dni: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      correo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      celular: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      oficina: {
        type: DataTypes.STRING,
      },
      estado: {
        type: DataTypes.STRING,
      },
      cod_recuperacion: {
        type: DataTypes.INTEGER,
      },
      cod_rol: {
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
      tableName: "usuario",
      freezeTableName: true,
    }
  );

  // Usuario.associate = models => {
  //   Usuario.hasMany(models.registro_inicio_sesion,{foreignKey:"cod_usuario"});
  //   Usuario.belongsTo(models.Rol);
  //   Usuario.belongsTo(models.Cliente);
  //   Usuario.belongsTo(models.Agente);
  // }

  return Usuario;
};
