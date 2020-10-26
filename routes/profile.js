const express = require('express');
const db = require('../models')
const router = express.Router();




router.post('/', (req, res) => {
    db.baby.create({
    name: req.body.name,
    birthdate: req.body.birthdate,
    
    })
    .then((baby) => {
    res.redirect('/')
    })
    .catch((error) => {
    res.status(400).render('partials/alerts')
    })
})

router.get('/', (req, res) => {
    res.locals.currentUser
    res.render('profile');
});

router.get('/:babyname', (req, res) => {
    db.baby.findOne({
        where: { babyname: req.params.name }
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