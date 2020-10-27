const express = require('express');
const db = require('../models')
const moment = require("moment");
const app = express();
const router = express.Router();


app.use((req, res, next)=>{
    res.locals.moment = moment;
    next();
});


router.post('/', (req, res) => {
    db.baby.create({
    name: req.body.name,
    birthdate: req.body.birthdate,
    
    })
    .then((baby) => {
    res.redirect('/profile')
    })
    .catch((error) => {
    res.status(400).render('partials/alerts')
    })
})

router.get('/', (req, res) => {
    res.locals.currentUser
    res.render('profile');
});

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