const express = require("express");
const { restart } = require("nodemon");
const userControllerSQL = require("../controllers/userControllerSQL.js");
const cookiesControllerSQL = require("../controllers/cookieControllerSQL.js");
const sessionControllerSQL = require("../controllers/sessionControllerSQL.js");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("This is the user router: successful!");
});

router.post("/usersignup", userControllerSQL.createUser, (req, res) => {
  //return res.status(200).send("good");
  if (res.answer === "added") {
    return res.status(200).send("good");
  }
  return res.status(200).send("no good");
});

router.post("/userlogin", userControllerSQL.verifyUser, (req, res) => {
  if (res.answer === "yes") {
    return res.status(200).send("good");
  }
  return res.status(200).send("no good");
});

module.exports = router;
