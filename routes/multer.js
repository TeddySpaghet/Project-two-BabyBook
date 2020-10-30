const multer = require('multer')




// Multer method - Set image storage engine (setup @16 min. marker) 
const storage = multer.diskStorage({
  destination: './public/uploads/', 
  filename: function(req, file, cb){
    // this describes how uploaded images are labeled. can be adjusted if needed
    cb(null,file.fieldname +'-'+ Date.now()+ path.extname(file.originalname))
  }
})

// initial image upload
const upload =multer({
  storage: storage,
  // sets max filesize
  limits: {fileSize:3000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb)
  }
  // can also be adjusted to upload many images, stored as an array
}).single('newImage')


// check image file type
const checkFileType =(file, cb)=>{
  // allowed image extensions
  const fileTypes = /jpeg|jpg|png|gif|tif/
  // check if uploaded file has image extension
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
  // check mime
  const mimeType = fileTypes.test(file.mimetype)

  if (mimeType && extName){
    return cb (null, true)
  }else{
    cb('Error: Image files only!')
  }
}



// multer image upload post route
app.post('/upload', (req, res)=>{
  upload(req, res, (err)=>{
    if(err){
      res.render('index', {
        msg: err
      })
    }else{
      // look at the image data that this prints out. this can be added to a database, and could be part of an album (rather than just single image) if we decide to tackle a slideshow image gallery. use fetch
      console.log('line 107:',req.file)
      console.log('line 108:',req.file.filename)
      res.send('test2')
      if(req.file == undefined){
        res.render ('index', {
          msg: 'Error: No file selected!'
        });
      }else{
        res.render('index',{
          msg: 'File uploaded!',
          file:  `uploads/${req.file.filename}`,
        })
      }

    }
  })
})