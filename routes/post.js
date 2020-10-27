const express = require('express');
const db = require('../models')
const router = express.Router();
const babyRouter = express.Router({mergeParams: true});

//nesting routes
router.use('/:name/post', babyRouter);

router.get('/', (req, res) => {
    res.locals.currentUser
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
    res.render('/profife/:name')
})

router.post('/', (req, res) => {
    db.post.create({
        height: req.body.height,
        weight: req.body.weight,
        img: req.body.img,
        title: req.body.title,
        firsts: req.body.firsts,
        favorites: req.body.favorites,
        //babyId: req.body.currentBaby.id,
    })
    .then((post) => {
    res.redirect('/profile/:name')
    })
    .catch((error) => {
    res.status(400).render('partials/alerts')
    })
})

module.exports = router;