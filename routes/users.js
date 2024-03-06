var express = require('express');
var router = express.Router();

const connection = require('../database.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const sql = "SELECT * FROM users";
  connection.query(sql, (err, data) => {
    if (err) throw err;
    res.render('users', { title: 'Users', 
                          userData : data,
                          });

  })
});

module.exports = router;
