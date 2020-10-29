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

// sets AWS version globally and assigns it to s3 variable
const BUCKET_NAME = 'firststeps_assets'
const s3 = new AWS.S3({
  accessKeyId:process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY
})


// // Multer method - Set image storage engine (setup @16 min. marker) 
// const storage = multer.diskStorage({
//   destination: './public/uploads/', 
//   filename: function(req, file, cb){
//     // this describes how uploaded images are labeled. can be adjusted if needed
//     cb(null,file.fieldname +'-'+ Date.now()+ path.extname(file.originalname))
//   }
// })

// // initial image upload
// const upload =multer({
//   storage: storage,
//   // sets max filesize
//   limits: {fileSize:3000000},
//   fileFilter: function(req, file, cb){
//     checkFileType(file, cb)
//   }
//   // can also be adjusted to upload many images, stored as an array
// }).single('newImage')

// // check image file type
// const checkFileType =(file, cb)=>{
//   // allowed image extensions
//   const fileTypes = /jpeg|jpg|png|gif|tif/
//   // check if uploaded file has image extension
//   const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
//   // check mime
//   const mimeType = fileTypes.test(file.mimetype)

//   if (mimeType && extName){
//     return cb (null, true)
//   }else{
//     cb('Error: Image files only!')
//   }
// }


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


// // multer image upload post route
// app.post('/upload', (req, res)=>{
//   upload(req, res, (err)=>{
//     if(err){
//       res.render('index', {
//         msg: err
//       })
//     }else{
//       // look at the image data that this prints out. this can be added to a database, and could be part of an album (rather than just single image) if we decide to tackle a slideshow image gallery. use fetch
//       console.log('line 107:',req.file)
//       console.log('line 108:',req.file.filename)
//       res.send('test2')
//       if(req.file == undefined){
//         res.render ('index', {
//           msg: 'Error: No file selected!'
//         });
//       }else{
//         res.render('index',{
//           msg: 'File uploaded!',
//           file:  `uploads/${req.file.filename}`,
//         })
//       }

//     }
//   })
// })


app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));

var server = app.listen(process.env.PORT || 3000, ()=> console.log(`🎧You're listening to the smooth sounds of port ${process.env.PORT || 3000}🎧`));

module.exports = server;
