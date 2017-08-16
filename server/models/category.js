module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        //
      }
    }
  });
  return Category;
};
