module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    author_name: {
      type:  DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return Author;
};
