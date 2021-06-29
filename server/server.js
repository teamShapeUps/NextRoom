const dotenv = require('dotenv')
dotenv.config({ path: './.env'})
const mongoRouter = require ('./routes/mongo')
const express = require('express')
const app = express()
const path = require('path')
const userController = require('./controllers/userController')
// const {User,Host} = require ('./Schemas/UserSchema')
const cookieController = require('./controllers/cookieController')
const sessionController = require('./controllers/sessionController')
// console.log(User)
const PORT = 3000;


app.use(express.urlencoded({ extended: true }))

app.use(express.json());
// Set static folder
app.use(express.static(path.join(__dirname, 'public')))
// Routes
app.use('/mongo', mongoRouter)


app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

module.exports = app;