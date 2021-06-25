const dotenv = require('dotenv')
dotenv.config({ path: './.env'})

const express = require('express')
const app = express()
const controller = require('./controllers/userController')
// const {User,Host} = require ('./Schemas/UserSchema')
const cookieController = require('./controllers/cookieController')
const sessionController = require('./controllers/sessionController')
// console.log(User)
const PORT = 3000;


app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.get('/',cookieController.setCookies,(req,res)=>{
    res.send('hello')
})

app.post('/usersignup', controller.newUser, (req,res)=>{
    res.send('user signup')
    //res.redirect('filepath')
})

app.post('/hostsignup', controller.newHost, (req,res)=>{
    res.send('user signup')
})

app.post('/userlogin', 
controller.verifyUser,
sessionController.startSession,
(req,res)=>{
    res.send('user has signed in!')}
)

app.post('/hostlogin', 
controller.verifyHost,(req,res)=>{
    res.send('user has signed in!')}
)

// console.log(Host);

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

module.exports = app;