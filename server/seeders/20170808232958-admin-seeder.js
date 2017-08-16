'use strict';
const bcrypt = require('bcrypt-nodejs');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  up: function (queryInterface, Sequelize) {

    const adminUser = {
      fullname: process.env.ADMIN_NAME,
      username: process.env.ADMIN_USERNAME,
      email: process.env.ADMIN_EMAIL,
      phone_no: process.env.ADMIN_PHONE,
      password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, bcrypt.genSaltSync(8), null),
      is_admin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return queryInterface.bulkInsert('Users', [adminUser], { returning: true });
  },

  down: function (queryInterface, Sequelize) {

  }
};
