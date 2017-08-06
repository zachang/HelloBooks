'use strict';
module.exports = function(sequelize, DataTypes) {
  var book = sequelize.define('book', {
    book_name: DataTypes.STRING,
    book_count: DataTypes.INTEGER,
    count_borrow: DataTypes.INTEGER,
    is_available: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return book;
};