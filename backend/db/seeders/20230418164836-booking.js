'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        startDate: new Date('2023-01-01'),
        endDate: new Date('2023-01-11')
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date('2023-08-21'),
        endDate: new Date('2023-09-01')
      },
      {
        spotId: 3,
        userId: 3,
        startDate: new Date('2023-05-15'),
        endDate: new Date('2023-05-18')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      startDate: { [Op.in]: ['2023-01-01', '2023-08-21', '2023-05-15'] }
    }, {});
  }
};