module.exports = (sequelize, DataTypes) => {
  const Borrow = sequelize.define('Borrow', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    borrowDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    borrowStatus: {
      type: DataTypes.STRING,
    },
    collectionDate: {
      type: DataTypes.DATE,
      defaultValue: null
    },
    expectedReturn: {
      type: DataTypes.DATE,
      defaultValue: null
    },
    actualReturn: {
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
        Borrow.belongsTo(models.Book, { foreignKey: 'bookId' });
        Borrow.belongsTo(models.User, { foreignKey: 'userId' });
      }
    }
  });
  return Borrow;
};
