'use strict';
const bcrypt = require("bcryptjs");
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        firstName: 'Demo',
        lastName: 'User',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: "info@americankickboxingacademy.com",
        username: "americankickboxingacademy",
        firstName: "Javier",
        lastName: "Mendez",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        firstName: 'Cesar',
        lastName: 'Gracie',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: "info@jacksonwink.com",
        username: "jacksonwink",
        firstName: "Greg",
        lastName: "Jackson",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: "contato@novauniao.com.br",
        username: "novauniao",
        firstName: "Andre",
        lastName: "Pederneiras",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: "info@tristargym.com",
        username: "tristargym",
        firstName: "Firas",
        lastName: "Zahabi",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: "info@sbgireland.com",
        username: "sbgireland",
        firstName: "John",
        lastName: "Kavanagh",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: "info@tigermuaythai.com",
        username: "tigermuaythai",
        firstName: "Viwat",
        lastName: "Sakulrat",
        hashedPassword: bcrypt.hashSync('password')
      }

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
