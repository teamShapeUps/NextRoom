const express = require("express");
const multer = require('multer');
const upload = multer({dest:'uploads/'})
const router = express.Router();

const {uploadFile} = require('./s3.js')

router.post("/upload", upload.single('image'), async (req, res) => {
  const file = req.file;
  console.log(file)
  const result = await uploadFile(file);
  console.log(result);
  const description = req.body.description;
  return res.send("works!");
});

module.exports = router;