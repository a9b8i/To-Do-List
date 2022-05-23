const express = require('express');

const router = express.Router();
const db = require('./db/models');


router.get('/', async (req, res, next) => {
  try {
    const tasks = await db.Task.findAll({ order: [['taskName', 'ASC']] });
    res.render('task-list', { title: 'Tasks', tasks });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
