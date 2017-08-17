'use strict';
const bcrypt = require('bcrypt-nodejs');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const adminUser = {
      fullname: process.env.ADMIN_NAME,
      username: process.env.ADMIN_USERNAME,
      email: process.env.ADMIN_EMAIL,
      phone_no: process.env.ADMIN_PHONE,
      level:process.env.ADMIN_LEVEL,
      password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, bcrypt.genSaltSync(8), null),
      is_admin: process.env.ADMIN_STATUS,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return queryInterface.bulkInsert('Users', [adminUser], { returning: true });
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
