module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Borrows', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      borrowDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      borrowStatus: {
        type: Sequelize.STRING,
      },
      collectionDate: {
        type: Sequelize.DATE,
        defaultValue: null
      },
      expectedReturn: {
        type: Sequelize.DATE,
        defaultValue: null
      },
      actualReturn: {
        type: Sequelize.DATE,
        defaultValue: null
      },
      returned: {
        type: Sequelize.STRING,
        defaultValue: 'false',
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Borrows');
  }
};