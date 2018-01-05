const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      isEmail: true,
      allowNull: false,
    },
    phoneNo: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    userImage: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isSocial: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    regType: {
      type: DataTypes.STRING,
      defaultValue: 'regular'
    },
    level: {
      type: DataTypes.STRING,
      defaultValue: 'silver',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Borrow, { foreignKey: 'userId' });
      }
    },
    instanceMethods: {
      generateHash(password) {
        this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      },
      validPassword(password) {
        return bcrypt.compareSync(password, this.password);
      },
    },
    hooks: {
      beforeCreate: (user) => {
        user.generateHash(user.password);
      },
      beforeUpdate: (user) => {
        if (user.newPassword) {
          user.generateHash(user.password);
        }
      }
    }
  });
  return User;
};
