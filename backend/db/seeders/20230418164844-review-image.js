'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: 'testreviewimg1.com'
      },
      {
        reviewId: 2,
        url: 'testreviewimg2.com'
      },
      {
        reviewId: 3,
        url: 'testreviewimg3.com'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['testreviewimg1.com', 'testreviewimg2.com', 'testreviewimg3.com'] }
    }, {});
  }
};
