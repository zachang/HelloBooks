'use strict';
const bcrypt = require("bcrypt-nodejs");

module.exports = (sequelize, DataTypes) => {
const User = sequelize.define('User', {
    fullname:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    username:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    phone_no:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    block_status:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },{
      instanceMethods: {
        generateHash(password){
          this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
        },
        validPassword(password){
          return bcrypt.compareSync(password, this.password)
        },
    },
    hooks: {
      beforeCreate: (user) => {
        user.generateHash()
      },
      beforeUpdate: (user) => {
        if(user.password){
          user.generateHash();
        }
      }
    }
  });
  return User;
};