const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SaltFactor = 10;
const cookiesControllerSQL = {};

// Cookies from chrome and req.cookies are different because of bcrypt.
// Nested middleware function

cookiesControllerSQL.initialCookie = (req, res, next) => {
  //console.log("This is res", req);
  //console.log("Hello");

  console.log(req);
};

cookiesControllerSQL.setCookie = async (req, res, next) => {
  try {
    let username = res.locals.userInfo.username; // NOT LOGGING

    const token = jwt.sign({
      data: username,
    }, process.env.JWT_KEY , {expiresIn: "1h"})

    //console.log(token)

    res.cookie('SSIDSQL', token, {
      httpOnly: true,
      secure: true,
    });
    return next();
  } catch (error) {
    console.log(error);
  }
};

cookiesControllerSQL.checkCookie = (req, res, next) => {
  //console.log('checkcookie', req.cookies.SSIDSQL); 
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  //console.log(decoded)
  next();
};



module.exports = cookiesControllerSQL;
