var express = require('express');
var router = express.Router();

const connection = require('../database.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', { title: 'Users' });
});

module.exports = router;
