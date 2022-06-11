const express = require('express');
const csrf = require('csurf');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const db = require('./db/models');
const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

router.get('/', asyncHandler(async (req, res) => {
 const tasks = await db.Task.findAll({ order: [['taskName', 'ASC']] });
 res.render('task-list', { title: 'Tasks', tasks });
}));


//Route for adding a task
router.get('/task/add', csrfProtection, (req, res) => {
  const task = db.Task.build();
  res.render('task-add', {
    title: 'Add Task',
    task,
    csrfToken: req.csrfToken(),
  });
});

const taskValidators = [
  check('taskName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Task')
    .isLength({ max: 255 })
    .withMessage('Task must not be more than 255 characters long'),
  check('personName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Person')
    .isLength({ max: 100 })
    .withMessage('Person must not be more than 100 characters long'),
  check('startDate')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for start Date')
    .isISO8601()
    .withMessage('Please provide a valid date for start Date'),
  check('deadline')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for deadline')
    .isISO8601()
    .withMessage('Please provide a valid date for deadline'),
  check('hours')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Page Count')
    .isInt({ min: 0 })
    .withMessage('Please provide a valid integer for Page Count'),
];


router.post('/task/add', csrfProtection, taskValidators, asyncHandler(async (req, res, next) => {
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

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    await task.save();
    res.redirect('/');
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('task-add', {
      title: 'Add Task',
      task,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}));


//Route for editing task
router.get('/task/edit/:id(\\d+)', csrfProtection,
  asyncHandler(async (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const task = await db.Task.findByPk(taskId);
    res.render('task-edit', {
      title: 'Edit Task',
      task,
      csrfToken: req.csrfToken(),
    });
  }));


  router.post('/task/edit/:id(\\d+)', csrfProtection, taskValidators,
  asyncHandler(async (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const taskToUpdate = await db.Task.findByPk(taskId);

    const {
      taskName,
      personName,
      startDate,
      deadline,
      hours,
    } = req.body;

    const task = {
      taskName,
      personName,
      startDate,
      deadline,
      hours,
    };

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await taskToUpdate.update(task);
      res.redirect('/');
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('book-edit', {
        title: 'Edit Task',
        task: { ...task, id: taskId },
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  }));


  //Route to delete Task
  router.get('/task/delete/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const task = await db.Task.findByPk(taskId);
    res.render('task-delete', {
      title: 'Delete Task',
      task,
      csrfToken: req.csrfToken(),
    });
  }));

  router.post('/task/delete/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const task = await db.Task.findByPk(taskId);
    await task.destroy();
    res.redirect('/');
  }));

module.exports = router;
