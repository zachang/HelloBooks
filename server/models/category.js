module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    classMethods: {
      associate: (models) => {
        Category.hasMany(models.Book, { foreignKey: 'category_id' });
      }
    }
  });
  return Category;
};
