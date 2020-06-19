'use strict';

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class Task extends Model { }

  Task.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: `Tittle can't be empty`
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: "No description"
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isAfter: {
          args: `${new Date()}`,
          msg: `Date must be greater than today`
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, { 
    sequelize, 
    // hooks: {
    //   beforeCreate: task => {
    //     task.due_date = new Date().toDateString()
    //   }
    // }
  });

  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User);
  };

  return Task;
};