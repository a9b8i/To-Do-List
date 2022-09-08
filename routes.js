const express = require('express');

const router = express.Router();
const db = require('./db/models');

router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

module.exports = router;
