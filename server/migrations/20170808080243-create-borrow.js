module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Borrows', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      book_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      borrow_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      borrow_status: {
        type: Sequelize.STRING,
      },
      collection_date: {
        type: Sequelize.DATE,
        defaultValue: null
      },
      expected_return: {
        type: Sequelize.DATE,
        defaultValue: null
      },
      actual_return: {
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