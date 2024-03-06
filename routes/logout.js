var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
   
    if (req.session) {
        req.session.destroy(err => {
          if (err) {
            res.status(400).send('Unable to log out')
          } else {
            res.render('index', { 
                // logged: req.session.email, 
                // message : 'Vous êtes deconnecté',
                title: 'Home', 
                 
              });
          }
        });
      } else {
        res.end()
      }
  });

  module.exports = router;