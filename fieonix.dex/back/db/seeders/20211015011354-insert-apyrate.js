'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('apyrates', [
      {
        limit_low: '0',
        limit_high: '1',
        coin: 'btc',
        categ: 'interest',
        apyOpen: '7',
        apyCap: '7'
      },
      {
        limit_low: '0',
        limit_high: '1',
        coin: 'btc',
        categ: 'pension',
        apyOpen: '7',
        apyCap: '7'
      },
      {
        limit_low: '1',
        limit_high: '20',
        coin: 'btc',
        categ: 'interest',
        apyOpen: '3',
        apyCap: '3'
      },
      {
        limit_low: '1',
        limit_high: '20',
        coin: 'btc',
        categ: 'pension',
        apyOpen: '3',
        apyCap: '5.25'
      },
      {
        limit_low: '20',
        limit_high: '',
        coin: 'btc',
        categ: 'interest',
        apyOpen: '0.65',
        apyCap: '0.65'
      },
      {
        limit_low: '20',
        limit_high: '',
        coin: 'btc',
        categ: 'pension',
        apyOpen: '0.65',
        apyCap: '0.85'
      },
      {
        limit_low: '0',
        limit_high: '100',
        coin: 'eth',
        categ: 'interest',
        apyOpen: '7.25',
        apyCap: '7.25'
      },
      {
        limit_low: '0',
        limit_high: '100',
        coin: 'eth',
        categ: 'pension',
        apyOpen: '7.25',
        apyCap: '9.25'
      },
      {
        limit_low: '100',
        limit_high: '1000',
        coin: 'eth',
        categ: 'interest',
        apyOpen: '4',
        apyCap: '4'
      },
      {
        limit_low: '100',
        limit_high: '1000',
        coin: 'eth',
        categ: 'pension',
        apyOpen: '4',
        apyCap: '6'
      },
      {
        limit_low: '1000',
        limit_high: '',
        coin: 'eth',
        categ: 'interest',
        apyOpen: '0.7',
        apyCap: '0.7'
      },
      {
        limit_low: '1000',
        limit_high: '',
        coin: 'eth',
        categ: 'pension',
        apyOpen: '0.7',
        apyCap: '0.9'
      },
      {
        limit_low: '0',
        limit_high: '',
        coin: 'usdc',
        categ: 'interest',
        apyOpen: '9',
        apyCap: '9'
      },
      {
        limit_low: '0',
        limit_high: '',
        coin: 'usdc',
        categ: 'pension',
        apyOpen: '9',
        apyCap: '11'
      },
      {
        limit_low: '0',
        limit_high: '',
        coin: 'sol',
        categ: 'interest',
        apyOpen: '4.5',
        apyCap: '4.5'
      },
      {
        limit_low: '0',
        limit_high: '',
        coin: 'sol',
        categ: 'pension',
        apyOpen: '4.5',
        apyCap: '6.5'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('apyrates', null, {});
  }
};
