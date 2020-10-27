/*
const express = require('express');
const db = require('../models')
const router = express.Router();
const babyRouter = express.Router({mergeParams: true});

//nesting routes
router.use('/:name/post', babyRouter);

router.get('/', (req, res) => {
    req.user;
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

router.post('/', (req, res) => {
    db.post.create({
        height: req.body.height,
        weight: req.body.weight,
        img: req.body.img,
        title: req.body.title,
        firsts: req.body.firsts,
        favorites: req.body.favorites,
        babyId: req.user.baby.dataValues.id,
    })
    .then((post) => {
    res.redirect('baby/show')
    })
    .catch((error) => {
    res.status(400).render('partials/alerts')
    })
})

module.exports = router;
*/