
module.exports = (sequelize, DataTypes) => {
  const author = sequelize.define('author', {
    authorName: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        author.belongsToMany(models.book, { through: 'bookAuthor', foreignKey: 'authorId' });
      }
    }
  });
  return author;
};
