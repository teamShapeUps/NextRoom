const  cookieController ={};

// cookieController.setCookies = async (req, res, next)=>{
//     res.cookie('cookie',Math.floor(Math.random() * 99))
//    next();
// }
cookieController.setSSIDCookie = (req, res, next) => {
  
    console.log('cookieController.setSSIDCookie: ssid user id', res.locals.id)
    res.cookie('ssid', res.locals.id, {
      httpOnly: true
    })
    return next()
  }

module.exports = cookieController;
