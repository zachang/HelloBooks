module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    book_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    book_image: {
      type: DataTypes.STRING,
      unique: true,
    },
    book_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    publish_year: {
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
    count_borrow: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Book.hasMany(models.Borrow, { foreignKey: 'book_id' });
        Book.belongsTo(models.Category, { foreignKey: 'category_id' });
      }
    }
  });
  return Book;
};
