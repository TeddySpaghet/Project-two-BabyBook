/*
const express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const db = require('../models')
const router = express.Router();
const babyRouter = express.Router({mergeParams: true});

//nesting routes
router.use('/:name/post', babyRouter);

router.get('/', isLoggedIn,(req, res) => {
    console.log("this is the baby's page ROUTE");
    db.baby.findOne({
        where: { name: req.params.name, userId: req.user.id, }
    })
    .then((baby) => {
        res.render('baby/show', { baby: baby })
    })
    .catch((error) => {
        req.flash('error', error.message);
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
        if (!post) throw Error()
    res.redirect('baby/show')
    })
    .catch((error) => {
        req.flash('error', error.message);
    })
})

module.exports = router;
*/