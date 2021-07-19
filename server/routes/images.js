const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();
const fs = require('fs');
const util = require('util');
const unlikeFile = util.promisify(fs.unlink); //It is used to convert a method that returns responses using a callback function to return responses in a promise object
const { uploadFile, getFileStream } = require('./s3.js');
const db = require('../models/NextroomModels.js');
const cookiesControllerSQL = require('../controllers/cookieControllerSQL.js');
const imageControllerSQL = require('../controllers/imageControllerSQL.js');

//
router.get('/show/:key', (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

router.post(
  '/upload',
  cookiesControllerSQL.checkCookie,
  upload.single('image'), //Accept a single file with the name 'image'. The single file will be stored in req.file
  async (req, res) => {
     const file = req.file;
  //   const id = res.locals.token.id;
  //   const query = `UPDATE rooms
  // SET imagefilename = ($1)
  // WHERE id = ($2)`;
  //   const values = [file.filename, id];
  //   await db.query(query, values);

    const result = await uploadFile(file); //Upload the file
    await unlikeFile(file.path); //Delete the file after uploading it to s3
    //console.log(result);
    const description = req.body.description;
    return res.send({ imagePath: `/images/${result.key}` });
  }
);

router.get(
  '/getimage',
  cookiesControllerSQL.checkCookie,
  imageControllerSQL.getImage,
  (req, res) => {
    res.status(200).send(res.locals.imageFileName);
  }
);

module.exports = router;
