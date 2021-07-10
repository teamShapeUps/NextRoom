const db = require("../models/NextroomModels");

const bcrypt = require("bcrypt");

const SaltFactor = 10;

const userControllerSQL = {};

userControllerSQL.createUser = async (req, res, next) => {
  try {
    const { username, isHost } = req.body;
    let { password } = req.body;

    //checking if user exists
    const queryText = `SELECT * FROM users where username  = ($1)`;
    const check = [username]; //
    const queryResult = await db.query(queryText, check);

    //BCrypt salting password
    const salt = await bcrypt.genSalt(SaltFactor);
    const hash = await bcrypt.hash(password, salt);
    password = hash;

    // if the user does NOT exist
    if (queryResult.rowCount === 0) {
      const addText = `INSERT INTO users (username, pass_word, isHost) VALUES ($1,$2,$3)`;
      const value = [username, password, isHost]; // coming from the front
      await db.query(addText, value);
      res.send("User Created");
      next();
    } else {
      res.send("User already exists");
    }
  } catch (error) {
    return next(error);
  }
};

userControllerSQL.verifyUser = async (req, res, next) => {
  try {
    const userQuery = `SELECT * FROM users WHERE username = $1`;
    const values = [req.body.username]; // comes from the front end input
    const userValid = await db.query(userQuery, values); // query db

    //if that user name is NOT there, move to next middleware
    if (userValid.rows.length === 0) {
      res.send("User Not Found!");
      return next();
    } else {
      const { username, pass_word, isHost } = userValid.rows[0];

      if (bcrypt.compare(req.body.pass_word, userValid.rows[0].password)) {
        res.locals.userInfo = {
          username: username,
          pass_word: pass_word,
          isHost: isHost,
        };
        return next();
      } else {
        return next();
      }
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = userControllerSQL;
