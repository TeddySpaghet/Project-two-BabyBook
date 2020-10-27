const express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const db = require('../models')
const router = express.Router();

router.get('/', isLoggedIn,(req, res) => {
    console.log("this is the profile ROUTE")
    db.baby.findAll({
        where: { 
            userId: req.user.id 
        }
    })
    
        .then((babies) => {
            console.log("here are the " + babies);
            console.log(typeof(babies));
            res.render('profile', { babies: babies })
        })
        .catch((error) => {
            console.log('Error in GET /', error)
            req.flash('error', error.message);
        })
});

router.post('/', (req, res) => {
    db.baby.create({
    name: req.body.name,
    birthdate: req.body.birthdate,
    userId: req.user.id,    
    })
    .then((baby) => {
        if (!baby) throw Error()
    res.redirect('/profile')
    })
    .catch((error) => {
        req.flash('error', error.message);
    })
})




router.get('/:name', (req, res) => {
    db.baby.findOne({
        where: { name: req.params.name, userId: req.user.id, }
    })
    .then((baby) => {
        if (!baby) throw Error()
        res.render('baby/show', { baby: baby })
    })
    .catch((error) => {
        req.flash('error', error.message);
    })
    }) 


//router.use('/profile/:name', require('./routes/babyProfile'));
module.exports = router;