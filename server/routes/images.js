const express = require("express");
const multer = require('multer');
const upload = multer({dest:'uploads/'})
const router = express.Router();
const fs = require('fs');
const util = require('util')
const unlikeFile = util.promisify(fs.unlink); //It is used to convert a method that returns responses using a callback function to return responses in a promise object
const {uploadFile, getFileStream} = require('./s3.js')
const db = require('../models/NextroomModels.js');

//
router.get('/show/:key', (req,res)=>{
  const key = req.params.key
  const readStream = getFileStream(key);

  readStream.pipe(res);
})

router.post("/upload", upload.single('image'), async (req, res) => {
  const file = req.file;
  //console.log(file.filename)

  // Need to make rooms table
  //const query = `INSERT INTO rooms (imageFileName) VALUES ($1)`
  //const queryResult = await db.query(query, [file.filename])

  const result = await uploadFile(file); //Upload the file
  await unlikeFile(file.path); //Delete the file after uploading it to s3
  //console.log(result);
  const description = req.body.description;
  return res.send({imagePath: `/images/${result.key}`});
});

module.exports = router;