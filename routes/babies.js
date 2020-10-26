const express = require('express');
const db = require('../models')
const passport = require('../config/ppConfig');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('auth/signup');
});

module.exports = router;