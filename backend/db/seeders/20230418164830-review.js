'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        review: 'Wondeful house, felt right at home',
        stars: 4
      },
      {
        spotId: 2,
        userId: 2,
        review: 'Did not like it, noisy neighbors',
        stars: 1
      },
      {
        spotId: 3,
        userId: 3,
        review: 'Enjoyed my stay but it was too bright',
        stars: 3
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      review: { [Op.in]: ['Wondeful house, felt right at home', 'Did not like it, noisy neighbors', 'Enjoyed my stay but it was too bright'] }
    }, {});
  }
};
