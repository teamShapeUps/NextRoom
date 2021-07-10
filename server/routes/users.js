const express = require("express");
const { restart } = require("nodemon");
const userControllerSQL = require("../controllers/userControllerSQL.js");
const router = express.Router();
// route.get('/', (req, res) => {
//     res.status(200).send('This is the user router: successful!')
// });
// router.post('/', userControllerSQL.createUser, (req, res) => {
//     return res.status(200).send('User created!')
// })
router.post("/usersignup", userControllerSQL.createUser, (req, res) => {
  return res.status(200).send("User created!");
});

module.exports = router;
