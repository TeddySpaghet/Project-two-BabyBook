const express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const db = require('../models')
const router = express.Router();


//profile page get route

router.get('/', isLoggedIn, (req, res) => {
    console.log("this is the profile ROUTE")
    db.baby.findAll({
        where: {
            userId: req.user.id
        }
    }).then((babies) => {
        console.log("here are the " + babies);
        console.log(typeof (babies));
        res.render('profile', { babies: babies })
    }).catch((error) => {
        console.log('Error in GET /', error)
        req.flash('error', error.message);
    })
});

// POST route to create new babies

router.post('/', (req, res) => {
    db.baby.create({
        name: req.body.name,
        birthdate: req.body.birthdate,
        userId: req.user.id,
        img: req.body.img,
    }).then((baby) => {
            if (!baby) throw Error()
            res.redirect('/profile')
    }).catch((error) => {
            req.flash('error', error.message);
    })
})

// GET route to baby's profile page

router.get('/:name', (req, res) => {
    db.baby.findOne({
        where: { name: req.params.name, userId: req.user.id, }
    }).then((baby) => {
        console.log("this is the baby id at line 49: ", baby.id)
        db.post.findAll({
            where: {
                babyId: baby.id
            }
        }).then((posts) => {
            res.render('baby/show', { posts: posts, baby: baby });
        }).catch((error) => {;
            req.flash('error', error.message);
        })
    }).catch((error) => {
        req.flash('error', error.message);
    })
})

// EDIT baby Route
router.get('/:name/edit', (req, res) => {
    db.baby.findOne({
        where: {
            name: req.params.name
        }
    }).then((baby) => {
        res.render('baby/edit', {baby:baby})
    }).catch((error) => {
        res.render('partials/alerts')
    })
})

router.put('/:name', (req, res) => {
    db.baby.findOne({
        where: {
            name: req.params.name
        }
    }).then((baby) => {
        baby.name = req.body.name;
        baby.birthdate = req.body.birthdate;
        baby.userId = req.body.userId;
        baby.img = req.body.img;
        baby.save().then((baby) => {
            res.redirect('/profile')
        }).catch((error) =>{
            console.log(error);
        })       
    }).catch((error) => {
        res.render('partials/alerts')
    })
})

// DELETE baby Route
router.delete('/:name', (req, res) => {
    db.baby.destroy({
        where: {
            name: req.params.name
        }
    }).then((baby) => {
        res.redirect('/profile')
    }).catch((error) => {
        req.flash('error', error.message);
    })
});

// POST route to create posts

router.post('/:name', (req, res) => {
    db.post.create({
        height: req.body.height,
        weight: req.body.weight,
        img: req.body.img,
        title: req.body.title,
        firsts: req.body.firsts,
        favorites: req.body.favorites,
        babyId: req.body.babyId,
    }).then((post) => {
        console.log("post created!!!! NICE line 85");
        res.redirect('/profile/' + req.params.name);
    }).catch((error) => {
        req.flash('error', error.message);
        res.redirect('/profile/' + req.params.name);
    })
})

// EDIT post Routes

router.get('/:name/:id/edit', (req, res) => {
    db.baby.findOne({
        where: {
            name: req.params.name, 
            userId: req.user.id,
        }
    }).then((baby) => {
        db.post.findOne({
            where: {
                babyId: baby.id,
                id: req.params.id,
            }
        }).then((post) => {
            res.render('posts/edit', {post, baby})
        }).catch((error) => {
                res.render('partials/alerts')
        })
    }).catch((error) => {
        res.render('partials/alerts')
    })
})

router.put('/:name/:id', (req, res) => {
    db.baby.findOne({
        where: {
            name: req.params.name, 
            userId: req.user.id,
        }
    }).then((baby) => {
        db.post.findOne({
            where: {
                babyId: baby.id,
                id: req.params.id,
            }
        }).then((post) => {
            post.height= req.body.height;
            post.weight= req.body.weight;
            post.img= req.body.img;
            post.title= req.body.title;
            post.firsts= req.body.firsts;
            post.favorites= req.body.favorites;
            post.babyId= req.body.babyId;
            post.save().then((post) => {
                res.redirect('/profile/' + req.params.name);
            }).catch((error) =>{
                console.log(error);
            })                   
        }).catch((error) => {
                res.render('partials/alerts')
        })
    }).catch((error) => {
        res.render('partials/alerts')
    })
})

// DELETE post Route
router.delete('/:name/:id', (req, res) => {
    db.post.destroy({
        where: {
            id: req.params.id
        }
    }).then((post) => {
        res.redirect('/profile/' + req.params.name)
    }).catch((error) => {
        req.flash('error', error.message);
    })
});

// get route for individual posts

router.get('/:name/posts/:id', (req, res) => {
    db.baby.findOne({
        where: { name: req.params.name, userId: req.user.id, }
    })
    .then((baby) => {
        db.post.findOne({
            where: { 
                babyId: baby.id,
                id: req.params.id,
            }
        }).then((post) => {
            res.render('baby/posts', { post: post, baby: baby });
        }).catch((error) => {
            console.log('Error in GET /', error);
            req.flash('error', error.message);
        })
    }).catch((error) => {
        req.flash('error', error.message);
    })
})


/*
//router.use('/profile/:name', require('./routes/babyProfile'));
*/
module.exports = router;