var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const path = require('path');
const connection = require('../database.js')
const bcrypt = require('bcrypt');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });

});


// router.post('/', function(request, response) {
// 	let email = request.body.email;
// 	let password = request.body.password;
// 	if (email && password) {
// 		connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
// 			if (error) throw error;
// 			if (results.length > 0) {
// 				// request.session.loggedin = true;
// 				// request.session.email = email;
// 				response.redirect('/home');
// 			} else {
// 				response.send('Email ou mot de passe incorrect !');
// 			}			
// 			response.end();
// 		});
// 	} else {
// 		response.send('Veuillez entrer vos informations de connexion !');
// 		response.end();
// 	}
// });

router.post('/', (req, res) => {
    const { email, password } = req.body;
  
    // Vérification si l'utilisateur existe
  
    // On cherhe dans la bdd la correspondance avec l'email entré par l'utilisateur
    connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
      //si le tableau résults est vide, 
      if (results.length === 0) {
        res.render('login', { message: 'Aucun utilisateur avec cette adresse mail', title: 'Login' });
  
      // sinon (il y a une adresse mail correspondante)
      } else {
        // Vérification du mot de passe : on hashe le mot de passe entré par l'utilisateur, et on compare
        // le résultat obtenu avec celui en bdd (results[0]).password )
        const match =  bcrypt.compare(password, results[0].password,
              (err, result) => {
                  if (err) throw err;
  
                  // Si result true, on ecrit en session les variables loggedIn et email.
                  if (result) {
                    req.session.loggedIn = true;
                    req.session.email = email;
  
                    // on renvoie sur /home
                    // res.redirect('/');
                    res.render('home', { logged: req.session.email, title: 'Home'});

                  //si result false, on renvoe vers le formulaire, avec un message d'erreur  
                  } else {
                    res.render('login', { message: 'Mot de passe incorrect', title: 'Login'});
                  }
                });
            }
          });
        });



module.exports = router;