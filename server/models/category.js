module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    category_name: DataTypes.STRING,
    unique: true,
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return category;
};
