const express = require('express');
const db = require('../models')
const router = express.Router();


router.get('/', (req, res) => {
    res.locals.currentUser
    res.render('profile');
});


router.post('/', (req, res) => {
    // let userId = currentUser.id
    // res.locals.currentUser
    console.log('line 15:',res.locals.currentUser)

    db.baby.create({
    name: req.body.name,
    birthdate: req.body.birthdate,
    // userId: req.currentUser.dataValues.id,
    // userId: userId
    
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
        where: { name: req.params.name }
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