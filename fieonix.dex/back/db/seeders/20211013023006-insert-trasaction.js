'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('transactions', [
      {
        addr_from: '9zftaxkgL55aBN5jnwq9tgQCiaFJfMxmqngVAxX5gbFP',
        addr_to: '4LTgNNt1yzQpUTKX7RRmeE3ddSJMgmjfPn6x8Anrwn5N',
        amount: '0.1',
        coin: 'sol',
        createdAt: '2021-10-13 02:57:05'
      },
      {
        addr_from: '0xf9c6f849011BD33AD95047Eefb920ee9B710214a',
        addr_to: '0xf9c6f849011BD33AD95047Eefb920ee9B710214a',
        amount: '0.01',
        coin: 'eth',
        createdAt: '2021-10-13 03:30:19'
      },
      {
        addr_from: 'mpBoNcsZzHXFSaDAD6Ciw2DE5dKuYdRDkm',
        addr_to: 'mgkzaCr4GUHmwrgYj52rJPym6fEZzHgPdq',
        amount: '0.0001',
        coin: 'btc',
        createdAt: '2021-10-13 03:31:06'
      },
      {
        addr_from: '0xf9c6f849011BD33AD95047Eefb920ee9B710214a',
        addr_to: '0xf9c6f849011BD33AD95047Eefb920ee9B710214a',
        amount: '0.01',
        coin: 'eth',
        createdAt: '2021-10-13 03:32:28'
      },
      {
        addr_from: '9zftaxkgL55aBN5jnwq9tgQCiaFJfMxmqngVAxX5gbFP',
        addr_to: '4LTgNNt1yzQpUTKX7RRmeE3ddSJMgmjfPn6x8Anrwn5N',
        amount: '0.2',
        coin: 'sol',
        createdAt: '2021-10-13 03:33:10'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('transactions', null, {});
  }
};
