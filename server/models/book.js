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
      allowNull: false,
    },
    book_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    count_borrow: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Book.hasMany(models.Borrow);
        Book.belongsTo(models.Category);
      }
    }
  });
  return Book;
};
