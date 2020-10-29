const express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const db = require('../models')
const router = express.Router();

router.get('/', isLoggedIn, (req, res) => {
    console.log("this is the profile ROUTE")
    db.baby.findAll({
        where: {
            userId: req.user.id
        }
    })

        .then((babies) => {
            console.log("here are the " + babies);
            console.log(typeof (babies));
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
            console.log("this is the baby id at line 49: ", baby.id)
            if (!baby) throw Error()
            db.post.findAll({
                where: {
                    babyId: baby.id
                }
            })

                .then((posts) => {
                    console.log("here are the " + posts + " at line 58");
                    console.log(typeof (posts));
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

// EDIT baby Route
router.get('/edit/:name', (req, res) => {
    db.baby.findOne({
        where: {
            name: req.params.name
        }
    }).then((baby) => {
        res.render('baby/edit', {baby})
    })
        .catch((error) => {
            res.render('partials/alerts')
        })
})

// EDIT post Route
router.get(':name/edit/:id', (req, res) => {
    db.baby.findOne({
        where: {
            name: req.params.name
        }
    }).then((baby) => {
        db.post.findOne({
            where: {
                id: req.params.id
            }
        }).then((post) => {
            res.render('posts/edit', {post, baby})
        }).catch((error) => {
                res.render('partials/alerts')
        })
    })
    .catch((error) => {
        res.render('partials/alerts')
    })
})

// DELETE baby Route
router.delete('/:name', (req, res) => {
    models.post.destroy({
        where: {
            id: req.params.name
        }
    }).then((post) => {
        res.redirect('/profile', {baby})
    })
        .catch((error) => {
            req.flash('error', error.message);
        })
});


router.post('/:name', (req, res) => {
    db.post.create({

        height: req.body.height,
        weight: req.body.weight,
        img: req.body.img,
        title: req.body.title,
        firsts: req.body.firsts,
        favorites: req.body.favorites,
        babyId: req.body.babyId,
    })
        .then((post) => {
            console.log("post created!!!! NICE line 85")
            res.redirect('/profile/' + req.params.name)
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
        console.log("this is the baby id at line 98: " , baby.id)
        if (!baby) throw Error()
        db.post.findOne({
            where: { 
                babyId: baby.id,
                id: req.params.id,
            }
        })
        
            .then((post) => {
                res.render('baby/posts', { post: post, baby: baby })
            })

                .then((post) => {
                    console.log("here are the " + post + "at line 107");
                    //console.log(typeof(posts));
                    res.render('baby/posts', { post: post, baby: baby })
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