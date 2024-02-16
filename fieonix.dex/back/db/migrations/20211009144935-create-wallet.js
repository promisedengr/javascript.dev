'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('wallets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: false
      },
      account_categ: {
        type: Sequelize.STRING
      },
      blockchain: {
        type: Sequelize.STRING
      },
      private: {
        type: Sequelize.STRING
      },
      public: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      wif: {
        type: Sequelize.STRING
      },
      balance: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.literal('0')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('wallets');
  }
};
