var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const path = require('path');
const connection = require('../database.js')
const bcrypt = require('bcrypt');
const saltRounds = 10


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Login' });

});


router.post('/', (req, res) => {
    const { email, password } = req.body;

    const hash = bcrypt.hashSync(password, saltRounds);

    connection.query('INSERT INTO users  (email,password) VALUES  (?, ?)', [email,hash], (error, result) => {

        if (result) {
            req.session.loggedIn = true;
            req.session.email = email;

            // on renvoie sur /home
            // res.redirect('/');
            res.render('home', { 
                                  logged: req.session.email, 
                                  title: 'Home', 
                                   
                                });

        };

    });
});
  

module.exports = router;