const express = require('express');
const csrf = require('csurf');

const router = express.Router();
const db = require('./db/models');


const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

router.get('/', asyncHandler(async (req, res) => {
 const tasks = await db.Task.findAll({ order: [['taskName', 'ASC']] });
 res.render('task-list', { title: 'Tasks', tasks });
}));

module.exports = router;
