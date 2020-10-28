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
        console.log("this is the baby id: " , baby.id)
        if (!baby) throw Error()
        db.post.findAll({
            where: { 
                babyId: baby.id
            }
        })
        
            .then((posts) => {
                //console.log("here are the " + posts);
                //console.log(typeof(posts));
                res.render('baby/show', { posts: posts, baby: baby })
            })
            .catch((error) => {
                console.log('Error in GET /', error)
                req.flash('error', error.message);
            })
    })
    .catch((error) => {
        req.flash('error', error.message);
    })
    
})

router.post('/:name', (req, res) => {
    db.post.create({
        height: req.body.height,
        weight: req.body.weight,
        //img: req.body.img,
        title: req.body.title,
        firsts: req.body.firsts,
        favorites: req.body.favorites,
        babyId: 14 //req.body.baby.id,
    })
    .then((post) => {
        if (!post) throw Error()
    res.redirect('/profile/:name')
    })
    .catch((error) => {
        req.flash('error', error.message);
    })
})

router.get('/:name/:id', (req, res) => {
db.baby.findOne({
        where: { name: req.params.name, userId: req.user.id, }
    })
    .then((baby) => {
        console.log("this is the baby id: " , baby.id)
        if (!baby) throw Error()
        db.post.findAll({
            where: { 
                babyId: baby.id,
                id: post.id,
            }
        })
        
            .then((posts) => {
                console.log("here are the " + posts + "at line 107");
                //console.log(typeof(posts));
                res.render('baby/post', { posts: posts, baby: baby })
            })
            .catch((error) => {
                console.log('Error in GET /', error)
                req.flash('error', error.message);
            })
    })
    .catch((error) => {
        req.flash('error', error.message);
    })
    
})


/*
//router.use('/profile/:name', require('./routes/babyProfile'));
*/
module.exports = router;