const bcrypt = require("bcrypt");
const SaltFactor = 10;

const cookiesControllerSQL = {};

// Cookies from chrome and req.cookies are different because of bcrypt.
// Nested middleware function

cookiesControllerSQL.initialCookie = (req, res, next) => {
  //console.log("This is res", req);
  console.log("Hello");

  console.log(req);
};

cookiesControllerSQL.setCookie = async (req, res, next) => {
  try {
    let username = res.locals.userInfo.username;
    const salt = await bcrypt.genSalt(SaltFactor);
    const hash = await bcrypt.hash(username, salt);
    username = hash;

    res.cookie("SSIDSQL", username, {
      httpOnly: true,
      secure: true,
      maxAge: 2 * 60 * 60 * 1000 * 1000,
    });
    //cookiesControllerSQL.initialCookie(username);
    //cookiesControllerSQL.checkCookie(cookies)
    //console.log('this is the cookie', hash )
    return next();
  } catch (error) {
    console.log(error);
  }
};

cookiesControllerSQL.checkCookie = (req, res, next) => {
  // console.log("checkcookie", req);
  // //console.log(req);
  // try {
  //   let hello = await bcrypt.compare(
  //     JSON.stringify(req.cookies.SSIDSQL),
  //     JSON.stringify('%242b%2410%24JqBiM9sXLLZAScdmaXhcZOXZOTuJIvFI1uasz.oTLye%2FxBAY3zXWy')
  //   );
  //   console.log(hello);
  // } catch (error) {
  //   console.log(error);
  // }
};

module.exports = cookiesControllerSQL;
