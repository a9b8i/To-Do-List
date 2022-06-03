const express = require('express');
const csrf = require('csurf');

const router = express.Router();
const db = require('./db/models');
const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

router.get('/', asyncHandler(async (req, res) => {
 const tasks = await db.Task.findAll({ order: [['taskName', 'ASC']] });
 res.render('task-list', { title: 'Tasks', tasks });
}));

router.get('/task/add', csrfProtection, (req, res) => {
  const task = db.Task.build();
  res.render('task-add', {
    title: 'Add Task',
    task,
    csrfToken: req.csrfToken(),
  });
});


router.post('/task/add', csrfProtection, asyncHandler(async (req, res, next) => {
  const {
    taskName,
    personName,
    startDate,
    deadline,
    hours,
  } = req.body;

  const task = db.Task.build({
    taskName,
    personName,
    startDate,
    deadline,
    hours,
  });

  try {
    await task.save();
    res.redirect('/');
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      const errors = err.errors.map((error) => error.message);
      res.render('task-add', {
        title: 'Add Task',
        task,
        errors,
        csrfToken: req.csrfToken(),
      });
    } else {
      next(err);
    }
  }
}));



module.exports = router;
