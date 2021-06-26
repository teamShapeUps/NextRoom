
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
      return res.redirect('/usersignup')
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
  console.log('sessionController.startSession',res.locals.id)
  // const ssidCook = {cookieId: req.cookies.ssid};
  //const ssidCook = {cookieId: res.locals._id};
  try {
    await Session.create({cookieId: res.locals.id});
    next()
  }
  catch (err) {
    next('Error in sessionController.startSession: ' + JSON.stringify(err));
  }

};

module.exports = sessionController;
