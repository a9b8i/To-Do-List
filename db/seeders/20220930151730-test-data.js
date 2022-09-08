'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tasks', [
      {
        taskName: 'Grocery Shopping',
        personName: 'John Appleseed',
        startDate: new Date('2022-09-30'),
        deadline: new Date('2022-10-01'),
        hours: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        taskName: 'Workout',
        personName: 'John Appleseed',
        startDate: new Date('2022-09-30'),
        deadline: new Date('2022-09-30'),
        hours: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        taskName: 'Finish Project',
        personName: 'John Appleseed',
        startDate: new Date('2022-09-30'),
        deadline: new Date('2022-10-01'),
        hours: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};
