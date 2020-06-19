'use strict';

const { encrypt } = require('../helpers/bcrypt.js');

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class User extends Model { }

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: `Email can't be empty`
        },
        isEmail: {
          msg: `Enter a valid email address`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [7, 20],
          msg: `Password must be between 7 & 20 characters`
        }
      }
    },
    organization: DataTypes.STRING
  }, { 
    sequelize, 
    hooks: {
      beforeCreate: user => {
        user.password = encrypt(user.password);
        user.organization = `Hacktiv8`;
      }
    }
  });

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Task);
  };

  return User;
};