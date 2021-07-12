
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" }); 

const mongoRouter = require("./routes/mongo.js");
const usersRouter = require("./routes/users.js");

const PORT = 3000;

app.use(cookieParser());

// Handle Parsign Request Body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/mongo', mongoRouter);
app.use('/users', usersRouter);

// Set static folder
app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  return res
    .status(200).json('Hello')
});


// GLOBAL ERROR Handler
function errorHandler(err, req, res, next) {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error has occured" },
  };
  const errorObj = Object.assign(err, defaultErr);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
}

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

module.exports = app;
