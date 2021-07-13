const db = require('../models/NextroomModels.js');
const sessionControllerSQL = {};

// This is to check if the user with unique SSID have active session. 
// If not active, move to the next middleware and delete the session
// If active, move to the next middleware and extend the session
sessionControllerSQL.verifySession = async (req, res, next)=>{
  const cookieid = res.locals.userInfo.userId;

}


sessionControllerSQL.isLoggedIn = async (req, res, next) => {
  const cookieid = res.locals.userInfo.userId;

  try {
    const text = 'SELECT * FROM session WHERE cookieid = $1';
    const values = [cookieid];
    res.locals.loggedIn = await db.query(text, values);

    if (res.locals.loggedIn.rows[0] !== undefined) {
      res.locals.loggedIn = true;
      next();
    } else {
      res.locals.loggedIn = false;
      next();
    }
  } catch (error) {
    return next(error);
  }
};


sessionControllerSQL.startSession = async (req, res, next)=>{
  const cookieid = req.cookies
  try{
    const text = 'INSERT INTO session (cookieid) VALUES ($1)'
    const values = [cookieid]
    res.locals.cookies = await db.query(text, values);
    next();
  } catch (error) {
    return next(error);
  }
};

sessionControllerSQL.logOut = async (req, res, next) => {
  const cookieid = req.cookies.SSID;
  try {
    const text = 'DELETE FROM session WHERE (cookieid) = ($1)';
    const values = [cookieid];
    await db.query(text, values);
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = sessionControllerSQL;
