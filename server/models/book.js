module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    bookName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookContent: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    bookImage: {
      type: DataTypes.STRING,
      unique: true,
    },
    bookCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    publishYear: {
      allowNull: false,
      type: DataTypes.DATE
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    pages: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    countBorrow: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Book.hasMany(models.Borrow, { foreignKey: 'bookId' });
        Book.belongsTo(models.Category, { foreignKey: 'categoryId' });
      }
    }
  });
  return Book;
};
