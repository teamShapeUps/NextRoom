const express = require('express');
const { restart } = require('nodemon');
const userControllerSQL = require('../controllers/userControllerSQL.js');
const cookiesControllerSQL = require('../controllers/cookieControllerSQL.js');
const sessionControllerSQL = require('../controllers/sessionControllerSQL.js');
const router = express.Router();

router.get('/', cookiesControllerSQL.checkCookie, (req, res) => {
  res.status(200).send('This is the user router: successful!');
});

router.post(
  '/usersignup',
  userControllerSQL.createUser,
  cookiesControllerSQL.setCookie,
  (req, res) => {
    //return res.status(200).send("good");
    if (res.answer === 'added') {
      return res.status(200).send('good');
    }
    return res.status(200).send('no good');
  }
);

router.get('/check', cookiesControllerSQL.checkCookie, (req, res) => {
  res.status(200).send(res.locals.token);
});

router.post(
  '/userlogin',
  userControllerSQL.verifyUser,
  cookiesControllerSQL.setCookie,
  (req, res) => {
    if (res.answer === 'yes') {
      return res.status(200).send('good');
    }
    return res.status(200).send('no good');
  }
);

router.put('/logout', sessionControllerSQL.logOut, (req, res) => {
  return res.status(200).send("It's deleted");
});


module.exports = router;
