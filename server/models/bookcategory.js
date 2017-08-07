module.exports = (sequelize, DataTypes) => {
  const bookCategory = sequelize.define('bookCategory', {
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    classMethods: {
      associate: (models) => {
        bookCategory.belongsTo(models.category, { foreignKey: 'categoryId' });
        bookCategory.belongsTo(models.book, { foreignKey: 'bookId' });
      }
    }
  });
  return bookCategory;
};
