'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
       spotId: 1,
       url: 'testurl1.com',
       preview: true
      },
      {
        spotId: 2,
        url: 'testurl2.com',
        preview: true
      },
      {
        spotId: 3,
        url: 'testurl3.com',
        preview: true
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['testurl1.com', 'testurl2.com', 'testurl3.com'] }
    }, {});
  }
};