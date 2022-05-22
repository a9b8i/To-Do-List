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


router.post('/task/add', csrfProtection, asyncHandler(async (req, res) => {
  const {
    title,
    author,
    releaseDate,
    pageCount,
    publisher,
  } = req.body;

  const book = db.Book.build({
    title,
    author,
    releaseDate,
    pageCount,
    publisher,
  });

  try {
    await book.save();
    res.redirect('/');
  } catch (err) {
    res.render('book-add', {
      title: 'Add Book',
      book,
      error: err,
      csrfToken: req.csrfToken(),
    });
  }
}));





module.exports = router;
