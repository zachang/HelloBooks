module.exports = (sequelize, DataTypes) => {
  const bookAuthor = sequelize.define('bookAuthor', {
    bookId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        bookAuthor.belongsTo(models.book, { foreignKey: 'bookId' });
        bookAuthor.belongsTo(models.author, { foreignKey: 'authorId' });
      }
    }
  });
  return bookAuthor;
};