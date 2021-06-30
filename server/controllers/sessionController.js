
const { Session } = require('../Schemas/sessionSchema');

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
  // console.log('sessionController.startSession',res.locals.id)
  // const ssidCook = {cookieId: req.cookies.ssid};
  //const ssidCook = {cookieId: res.locals._id};
  try {
     const session = await Session.create({cookieID: res.locals.id});
     if(session) return next()
  }
  catch (err) {
    next( {log:'Error in sessionController.startSession: ' + JSON.stringify(err["message"])}  );
  }

};

module.exports = sessionController;
