module.exports = {
  up: (queryInterface, Sequelize ) =>
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      phoneNo: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      },
      userImage: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isSocial: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      regType: {
        type: Sequelize.STRING,
        defaultValue: 'regular'
      },
      level: {
        type: Sequelize.STRING,
        defaultValue: 'silver',
      },
      password: {
        type: Sequelize.STRING,
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
    }),
  down: (queryInterface) => queryInterface.dropTable('Users'),
};
