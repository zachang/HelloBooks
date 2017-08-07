module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    classMethods: {
      associate: (models) => {
        category.belongsToMany(models.book, { through: 'bookCategory', foreignKey: 'categoryId' });
      }
    }
  });
  return category;
};
