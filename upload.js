require('dotenv').config();
const AWS = require ('aws-sdk')
const fs = require('fs')

// sets AWS version globally and assigns it to s3 variable
const BUCKET_NAME = "firststeps-assets"
const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
  accessKeyId:process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY
})

const uploadFile = (fileName)=>{
   // read content from the filenName
   const fileContent =fs.readFileSync(fileName);

   // setting up S3 upload parameters
   const params ={
      Bucket: BUCKET_NAME,
      Key: '01month.jpg',  //file name you want to save as in S3
      Body: fileContent
      // other parameters can be added, such as ContentType (file type) and ContentLength (file size)
   };
   // uploading files to the bucket
   s3.upload(params, function(err, data){
      if (err){
         throw err;
      }
      console.log(`File uploaded succsessfully. ${data.Location}`)
   });
};

uploadFile('01month.jpg')