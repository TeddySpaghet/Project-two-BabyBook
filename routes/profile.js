const express = require('express');
const db = require('../models')
const router = express.Router();

router.get('/', (req, res) => {
    res.locals.currentUser
    res.render('profile');
});

router.post('/', (req, res) => {
    db.baby.create({
        name: req.body.name,
        birthdate: req.body.birthdate,
        userId: req.user.dataValues.id,

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

// js method of calling modal
// document.addEventListener('DOMContentLoaded', function() {
//     let elems = document.querySelectorAll('.modal');
//     let instances = M.Modal.init(elems, options);
//   })

// jquery method of calling modal
// $(document).ready(function () {
//     $('.modal').modal();
// })

module.exports = router;