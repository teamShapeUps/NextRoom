const bcrypt = require("bcrypt");
const SaltFactor = 10;

const cookiesController = {};


cookiesController.setCookie = (req, res, next) => {

  let username  = res.locals.userInfo.username;
  const salt = await bcrypt.genSalt(SaltFactor);
  const hash = await bcrypt.hash(username, salt);
  username = hash;

  res.cookie('SSID', username, {
    httpOnly: true,
    secure: true,
    maxAge: 2 * 60 * 60 * 1000 * 1000,
  });
  
  return next();
};

module.exports = cookiesController;
