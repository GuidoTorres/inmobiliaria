'use strict';

const db = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(db.models.Usuario);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usuario');
  }
};