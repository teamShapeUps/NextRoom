// this is where the SERVER goes

const dotenv = require("dotenv");

dotenv.config({ path: "./.env" }); // --> ?

const mongoRouter = require("./routes/mongo.js");
const usersRouter = require("./routes/users.js");

const express = require("express");

const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");

const PORT = 3000;

app.get("/", (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, "../client/index.html"));
});

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
// Set static folder
app.use(express.static(path.join(__dirname, "public")));
// Routes
app.use("/mongo", mongoRouter);

// Routes WITH Postgres
app.use("/users", usersRouter);

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
