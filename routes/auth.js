const express = require('express');
const db = require('../models')
const passport = require('../config/ppConfig');
const router = express.Router();





router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res) => {
  // finding or creating a user, given their name, password, email
  db.user.findOrCreate({
    where: { email: req.body.email },
    defaults: { 
      name: req.body.name,
      password: req.body.password
    }
  }).then(([user, created]) => {
    // if created, this means success and we can redirect to home
    if (created) {
       // FLASH
        passport.authenticate('local', {
        successRedirect: '/profile',
        successFlash: 'Account created and logged in'
      })(req, res);
    } else {
      // FLASH
      req.flash('error', 'Email already exists');
      res.redirect('/auth/signup');
    }

  }).catch(error => {
    // if error occures, let's see the error
    // FLASH
    req.flash('error', error.message);
    res.redirect('/auth/signup');
  });
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

// require the passport configuration at the top of the file


router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid username and/or password',
  successFlash: 'You have logged in'
}));

router.post('/signup', (req, res) => {
  db.user.findOrCreate({
    where: {
      email: req.body.email
    }, defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).then(([user, created]) => {
    if (created) {
      console.log('user created');
      passport.authenticate('local', {
        successRedirect: '/profile',
      })(req, res);
    } else {
      console.log('email already exists');
      res.redirect('/auth/signup');
    }
  }).catch(err => {
    console.log('💩 Error occured finding or creating user');
    console.log(err);
    res.redirect('/auth/signup');
  });
});

router.get('/logout', (req,res) => {
  req.logout();
  req.flash('success', 'You have logged out');
  res.redirect('/');
})



module.exports = router;