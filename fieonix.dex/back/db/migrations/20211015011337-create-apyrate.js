'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('apyrates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      limit_low: {
        type: Sequelize.STRING
      },
      limit_high: {
        type: Sequelize.STRING
      },
      coin: {
        type: Sequelize.STRING
      },
      categ: {
        type: Sequelize.STRING
      },
      apyOpen: {
        type: Sequelize.STRING
      },
      apyCap: {
        type: Sequelize.STRING
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('apyrates');
  }
};
