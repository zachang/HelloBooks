module.exports = (sequelize, DataTypes) => {
  const Borrow = sequelize.define('Borrow', {
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
    borrow_status: {
      type: DataTypes.STRING,
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
    returned: {
      type: DataTypes.STRING,
      defaultValue: 'false',
      allowNull: false,
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
        Borrow.belongsTo(models.Book, { foreignKey: 'book_id' });
        Borrow.belongsTo(models.User, { foreignKey: 'user_id' });
      }
    }
  });
  return Borrow;
};
