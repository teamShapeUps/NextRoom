const bcrypt = require("bcrypt");
const db = require('../models/NextroomModels.js');
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
    const username = [res.locals.userInfo.username]; // NOT LOGGING

    const idquery = `SELECT id FROM users WHERE username = ($1)`
    const idqueryResult = await db.query(idquery, username);
    const id = idqueryResult.rows[0].id

    const token = await jwt.sign({
      id: id,
    }, process.env.JWT_KEY , {expiresIn: "1h"})

    res.locals.token = {
      tokenid: token,
    }

    res.cookie('SSIDSQL', token, {
      httpOnly: true,
      secure: true,
    });

    return next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

cookiesControllerSQL.checkCookie = (req, res, next) => {
  const token = req.cookies.SSIDSQL
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  //console.log(decoded)
  res.locals.token = decoded;
  next();

  /* 
  decoded returns this
  {
    id: 'f2e30374-e37c-11eb-b60f-f9eb6eb2c2d4',
    iat: 1626305338,
    exp: 1626308938
  }
  */
};


module.exports = cookiesControllerSQL;
