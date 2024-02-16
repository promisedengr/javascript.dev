'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      birthDay: {
        type: Sequelize.STRING
      },
      nation: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      addr1: {
        type: Sequelize.STRING
      },
      addr2: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      postcode: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      locked: {
        type: Sequelize.BOOLEAN,
        defaultValue: Sequelize.literal('0')
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: Sequelize.literal('0')
      },
      twoFact: {
        type: Sequelize.BOOLEAN,
        defaultValue: Sequelize.literal('0')
      },
      passChg: {
        type: Sequelize.BOOLEAN,
        defaultValue: Sequelize.literal('1')
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      activedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      avata: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      alarmTansact: {
        type: Sequelize.BOOLEAN,
        defaultValue: Sequelize.literal('1')
      },
      alarmPricChg: {
        type: Sequelize.BOOLEAN,
        defaultValue: Sequelize.literal('1')
      },
      alarmPricUpt: {
        type: Sequelize.BOOLEAN,
        defaultValue: Sequelize.literal('true')
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: Sequelize.literal('true')
      },
      uuid: {
        type: Sequelize.STRING,
        defaultValue: ''
      }

    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};