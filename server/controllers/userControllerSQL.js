const db = require("../models/NextroomModels");
const bcrypt = require("bcrypt");

const SaltFactor = 10;

const userControllerSQL = {};

userControllerSQL.createUser = async (req, res, next) => {
  try {
    const { username } = req.body.data;
    let { password } = req.body.data;

    // console.log("Password type is:  ", typeof password);
    // console.log(password);

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
      const addText = `INSERT INTO users (username, password) VALUES ($1,$2)`;
      const value = [username, password]; // coming from the front
      await db.query(addText, value);
      res.answer = "added";
      res.locals.userInfo = {
        username: username,
      };
      console.log("user created!");
      return next();
    } else {
      return res.status(400).send("User already exists");
    }
  } catch (error) {
    return next(error);
  }
};

// userControllerSQL.createUser = async (req, res, next) => {
//   try {
//     const { username, isHost } = req.body.data;
//     let { password } = req.body.data;

//     console.log("req.body.data:", req.body.data); // info logging from the back
//     const hashedPassword = await bcrypt.hash(password, SaltFactor);
//     const newUser = await db.query(
//       `INSERT INTO users (username, password, isHost) VALUES ($1,$2,$3) RETURNING *`,
//       [username, hashedPassword, isHost]
//     );
//     // res.answer = "added";
//     return next();
//   } catch (err) {
//     return next({
//       log: "userControllerSQL.createUser: ERROR: Error adding user",
//       message: {
//         err: `Error occurred in userControllerSQL.createUser. err log: ${err}`,
//       },
//     });
//   }
// };

userControllerSQL.verifyUser = async (req, res, next) => {
  try {
    // Destructure from req.body.data from input on front end
    const { username, password} = req.body.data;

    await db.query(
      "SELECT * FROM users WHERE username = $1",
      [username],
      (err, results) => {
        if (err) {
          throw err;
        }
        if (results.rows.length > 0) {
          const username = results.rows[0];
          bcrypt.compare(password, username.password, (err, isMatch) => {
            if (err) {
              throw err;
            }
            if (isMatch) {
              console.log("User logged in");
              res.locals.userInfo = {
                username: username.username,
                password: username.password,
              };
              res.answer = "yes";
              return next();
            } else {
              console.log("Something is wrong, check your password again");
              next();
            }
          });
        }
      }
    );
  } catch (error) {
    return next({
      log: "userControllerSQL.verifyUser: Error logging in",
      message: {
        err: `Error occured in userControllerSQL.verifyUser. err log ${err}`,
      },
    });
  }
};

userControllerSQL.deleteUser = async (req, res, next) =>{
  try{
    const user = req.params.username;
    const selectQuery = `SELECT * FROM users WHERE username = ($1)`
    const result = await db.query(selectQuery, user);
    
    if(result.rows[0] !== 0){
      const deleteQuery = `DELETE FROM users WHERE username = ($1)`
      await db.query(deleteQuery, [user]);
      next();
    }else{
      res.status(400).send("User not found")
    }
    
  }catch(err){
    console.log(err);
    next(err);
  }
}

module.exports = userControllerSQL;
