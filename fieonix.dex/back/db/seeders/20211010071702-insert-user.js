'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        firstName: 'Jerry',
        lastName: 'Doe',
        email: 'jerry@email.com',
        birthDay: '06/21/1996',
        nation: 'UK',
        country: 'UK',
        addr1: 'rty',
        addr2: '536',
        city: 'London',
        postcode: '9704',
        phone: '4595960'
      },
      {
        firstName: 'Tom',
        lastName: 'OC',
        email: 'tom@email.com',
        birthDay: '02/11/1988',
        nation: 'Irish',
        country: 'Ireland',
        addr1: '123',
        addr2: 'asd',
        city: 'Cork',
        postcode: '19704',
        phone: '353445595960',
        isAdmin: '1'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
