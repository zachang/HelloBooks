module.exports = (sequelize, DataTypes) => {
  const borrow = sequelize.define('borrow', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    borrow_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    collection_date: {
      type: DataTypes.DATE,
      defaultValue: null
    },
    expected_return: {
      type: DataTypes.DATE,
      defaultValue: null
    },
    actual_return: {
      type: DataTypes.DATE,
      defaultValue: null
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    classMethods: {
      associate: (models) => {
        borrow.belongsTo(models.book, { foreignKey: 'book_id' });
        borrow.belongsTo(models.User, { foreignKey: 'user_id' });
      }
    }
  });
  return borrow;
};
