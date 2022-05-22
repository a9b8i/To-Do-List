// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   const Task = sequelize.define('Task', {
//     taskName: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     personName:{
//       type: DataTypes.STRING(100),
//       allowNull: false
//     },
//     startDate: {
//       type: DataTypes.DATEONLY,
//       allowNull: false
//     },
//     deadline:  {
//       type: DataTypes.DATEONLY,
//       allowNull: false
//     },
//     hours: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     }
//   }, {});
//   Task.associate = function(models) {
//     // associations can be defined here
//   };
//   return Task;
// };



'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    taskName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    personName:{
      type: DataTypes.STRING(100),
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    deadline:  {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    hours: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};
