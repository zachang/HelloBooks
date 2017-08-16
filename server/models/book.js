module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    book_name: {
      type: DataTypes.STRING,
      unique: true,
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
      }
    }
  });
  return Book;
};
