module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    classMethods: {
      associate: (models) => {
        Category.hasMany(models.Book, { foreignKey: 'categoryId' });
      }
    }
  });
  return Category;
};
