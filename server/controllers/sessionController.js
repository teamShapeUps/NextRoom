
const Session = require('../Schemas/sessionSchema');

const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*/
sessionController.isLoggedIn = async (req, res, next) => {
  // 
  const ssidCook = {cookieId: req.cookies.ssid};
  try{
    const currentUser = await Session.find(ssidCook);
    console.log('isLoggedIn ', currentUser)
    if (currentUser.length > 0) {
      next();
    }else {
      return res.redirect('/signup')
    }

  }catch(err){
    return next({
      log: console.log('isLoggedin err',err)
    })
  }
};

/**
* startSession - create and save a new Session into the database.
*/
sessionController.startSession = async (req, res, next) => {
  //write code here
  const ssidCook = {cookieId: req.cookies.ssid};
  
  try {
    const doc = new Session(ssidCook);
    res.locals.session = await doc.save();
    //next();
    // const temp = await Session.find()
    console.log(res.locals.session)
    //return res.redirect('/secret')
    next();
  }catch(err){
    console.log('startSession', err)
    next(err);
  }

};

module.exports = sessionController;
