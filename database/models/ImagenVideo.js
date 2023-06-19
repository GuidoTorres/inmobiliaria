"use strict";

module.exports = (sequelize, DataTypes) => {
  let ImagenVideo = sequelize.define(
    "imagenVideo",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
      },
      cod_propiedad: {
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
      tableName: "imagenVideo",
      freezeTableName: true,
    }
  );

  return ImagenVideo;
};
