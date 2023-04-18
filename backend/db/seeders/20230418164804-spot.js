'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
      ownerId:1,
      address: "123 Disney Lane",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Walt Disney House",
      description: "Where dreams come true",
      price: 800
      },
      {
      ownerId:2,
      address: "456 Radberry Ct",
      city: "Los Angeles",
      state: "California",
      country: "United States of America",
      lat: 50.7645358,
      lng: 82.4730327,
      name: "Ice Cube",
      description: "Today was a good day",
      price: 300
      },
      {
      ownerId:3,
      address: "500 Sunshine Blvd",
      city: "Miami",
      state: "Florida",
      country: "United States of America",
      lat: 87.7645358,
      lng: 30.4730327,
      name: "Sunshine House",
      description: "Comes with free sunshine",
      price: 1000
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["Walt Disney House", "Ice Cube", "Sunshine House"] }
    }, {});
  }
};
