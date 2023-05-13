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
        ownerId: 2,
        address: "AKA Headquarters, 7011 Realm Dr",
        city: "San Jose",
        state: "California",
        country: "United States",
        lat: 37.391936,
        lng: -121.899194,
        name: "American Kickboxing Academy",
        description: "One of the top MMA gyms in the world, AKA is home to many UFC champions including Daniel Cormier, Khabib Nurmagomedov, and Cain Velasquez.",
        price: 200
      },
      {
        ownerId: 3,
        address: "150 Longbrook Way",
        city: "Pleasant Hill",
        state: "California",
        country: "United States of America",
        lat: 50.7645358,
        lng: 82.4730327,
        name: "Cesar Gracie Jiu Jitsu",
        description: "We are the premier jiu jitsu academy of Northern California. Founded in 1992 by Cesar Gracie, we were the first BJJ school in the Bay Area and have developed the very best jiu jitsu practitioners in the U.S. More importantly is what we can do for you and your family.",
        price: 100
      },
      {
        ownerId: 4,
        address: "5321 Pan American Fwy NE",
        city: "Albuquerque",
        state: "New Mexico",
        country: "United States",
        lat: 35.132324,
        lng: -106.593781,
        name: "Jackson Wink MMA Academy",
        description: "One of the most famous MMA gyms in the world, Jackson Wink has produced champions like Jon Jones, Holly Holm, and Carlos Condit.",
        price: 175
      },
      {
        ownerId: 5,
        address: "Rua Dona Mariana, 151",
        city: "Rio de Janeiro",
        state: "Rio de Janeiro",
        country: "Brazil",
        lat: -22.957073,
        lng: -43.193741,
        name: "Nova Uniao",
        description: "Based in Rio de Janeiro, Nova Uniao is one of the top MMA gyms in Brazil and has produced world champions like Jose Aldo and Renan Barao.",
        price: 100
      },
      {
        ownerId: 6,
        address: "5275 Ferrier",
        city: "Montreal",
        state: "Quebec",
        country: "Canada",
        lat: 45.494891,
        lng: -73.652754,
        name: "Tristar Gym",
        description: "Located in Montreal, Tristar Gym is home to some of the best fighters in the world including Georges St-Pierre, Rory MacDonald, and Francis Ngannou.",
        price: 175
      },
      {
        ownerId: 7,
        address: "Kilcolgan Business Park, Unit 20, Kilcolgan",
        city: "Galway",
        state: "Ireland",
        country: "Ireland",
        lat: 53.197388,
        lng: -8.829175,
        name: "SBG Ireland",
        description: "Founded by John Kavanagh, SBG Ireland is one of the top MMA gyms in Europe and has trained fighters like Conor McGregor and Gunnar Nelson.",
        price: 150
      },
      {
        ownerId: 8,
        address: "7/35 Soi Ta-iad",
        city: "Phuket",
        state: "Ao Chalong",
        country: "Thailand",
        lat: 7.846478,
        lng: 98.340689,
        name: "Tiger Muay Thai & MMA Training Camp",
        description: "Located in Phuket, Thailand, Tiger Muay Thai is home to the top MMA Muay Thai gym in Thailand including fighters such as Petr Yan and Alexander Volkanovski",
        price: 250
      },
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
