const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
  console.log('cookieController.setSSIDCookie: ssid user id', res.locals.user._id);
  res.cookie('ssid', res.locals.user._id, {
    httpOnly: true,
  });
  return next();
};

module.exports = cookieController;
