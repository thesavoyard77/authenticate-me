'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Reservations', [
        {userId: 4, propertyId: 7, startDate: '2021-11-12', endDate: '2021-11-19', totalPrice: 8190.00, createdAt: new Date(), updatedAt: new Date()},
        {userId: 2, propertyId: 4, startDate: '2021-11-19', endDate: '2021-11-23', totalPrice: 600.00, createdAt: new Date(), updatedAt: new Date()},
        {userId: 1, propertyId: 9, startDate: '2021-9-22', endDate: '2021-9-22', totalPrice: 480.00, createdAt: new Date(), updatedAt: new Date()},
      ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Reservations', null, {});

  }
};
