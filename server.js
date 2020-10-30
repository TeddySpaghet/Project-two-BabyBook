require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./config/ppConfig');
const flash = require('connect-flash');
const isLoggedIn = require('./middleware/isLoggedIn');
// const multer = require('multer')
const path = require('path');
const AWS = require ('aws-sdk');
const methodOverride = require('method-override');

const { runInNewContext } = require('vm');

// sets AWS version globally 
const BUCKET_NAME = 'firststeps_assets'
const s3 = new AWS.S3({
  accessKeyId:process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY
})





const app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
// app.use(express.static('./public'))
app.use(layouts);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});
app.use(methodOverride('_method'));



app.get('/', (req, res) => {
  res.render('index');
});





app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));

var server = app.listen(process.env.PORT || 3000, ()=> console.log(`🎧You're listening to the smooth sounds of port ${process.env.PORT || 3000}🎧`));

module.exports = server;
