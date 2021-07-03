const dotenv = require('dotenv')
dotenv.config({ path: './.env'})

const mongoRouter = require ('./routes/mongo.js')
const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')

const PORT = 3000;

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }))

app.use(express.json());
// Set static folder
app.use(express.static(path.join(__dirname, 'public')))
// Routes
app.use('/mongo', mongoRouter)


app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

module.exports = app;