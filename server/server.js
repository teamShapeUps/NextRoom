const express = require("express");
const favicon = require("serve-favicon");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const axios = require("axios");

dotenv.config({ path: "./.env" });

const mongoRouter = require("./routes/mongo.js");
const usersRouter = require("./routes/users.js");
const imagesRouter = require("./routes/images.js");
const tableRouter = require("./routes/table.js")
const roomRouter = require("./routes/room.js")
const cookiesControllerSQL = require('./controllers/cookieControllerSQL.js');

const PORT = 3000;
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(cookieParser());


// Handle Parsign Request Body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Check cookies every single time before going to ANY route
//app.use(cookiesControllerSQL.checkCookie) //---> issue signing up if first time user
// app.all('*', cookiesControllerSQL.checkCookie, (req, res, next)=>{
//   next();
// })

// Routes
app.use("/mongo", mongoRouter);
app.use("/users", usersRouter);
app.use("/rooms", roomRouter);
app.use("/images", imagesRouter);
app.use("/create", tableRouter)

// Set static folder
app.use("/build", express.static(path.join(__dirname, "../build")));

app.get("/", (req, res) => {
  return res.status(200).json("Hello");
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
