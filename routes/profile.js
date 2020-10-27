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
            res.status(400).render('partials/alert')
        })
});

router.post('/', (req, res) => {
    db.baby.create({
    name: req.body.name,
    birthdate: req.body.birthdate,
    userId: req.user.id,    
    })
    .then((baby) => {
    res.redirect('/profile')
    })
    .catch((error) => {
    res.status(400).render('partials/alerts')
    })
        .then((baby) => {
            res.redirect('/profile')
        })
        .catch((error) => {
            res.status(400).render('partials/alerts')
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
            res.status(400).render('partials/alerts')
        })
})



module.exports = router;