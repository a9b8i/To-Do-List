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
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for Task',
        },
        notEmpty: {
          msg: 'Please provide a value for Task',
        },
        len: {
          args: [0, 255],
          msg: 'Title must not be more than 255 characters long',
        }
      }
    },
    personName:{
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for Author',
        },
        notEmpty: {
          msg: 'Please provide a value for Author',
        },
        len: {
          args: [0, 100],
          msg: 'Author must not be more than 100 characters long',
        }
      }
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for Release Date',
        },
        isDate: {
          msg: 'Please provide a valid date for Release Date',
        }
      }
    },
    deadline:  {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for Release Date',
        },
        isDate: {
          msg: 'Please provide a valid date for Release Date',
        }
      }
    },
    hours: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for Page Count',
        },
        isInt: {
          msg: 'Please provide a valid integer for Page Count',
        }
      }
    }
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};

