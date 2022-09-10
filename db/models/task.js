'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    taskName: DataTypes.STRING,
    personName: DataTypes.STRING,
    startDate: DataTypes.DATEONLY,
    deadline: DataTypes.DATEONLY,
    hours: DataTypes.INTEGER
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};