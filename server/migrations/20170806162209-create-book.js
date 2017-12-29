module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookName: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bookContent: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      bookImage: {
        type: Sequelize.STRING,
        unique: true,
      },
      bookCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      publishYear: {
        allowNull: false,
        type: Sequelize.DATE
      },
      isbn: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pages: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      countBorrow: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      isAvailable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
  down: (queryInterface) => queryInterface.dropTable('Books'),
};