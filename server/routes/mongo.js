const express = require('express');
const userController = require('../controllers/userController')
const cookieController = require('../controllers/cookieController')
const sessionController = require('../controllers/sessionController')
const app = express();

app.post('/usersignup',
 userController.newUser,
 cookieController.setSSIDCookie,
 sessionController.startSession,
 (req,res)=>{
    res.status(200).json(res.locals.user)
    //res.redirect('filepath')
})

app.post('/hostsignup', 
userController.newHost, 
cookieController.setSSIDCookie,
sessionController.startSession,
(req,res)=>{
    // res.send('user signup')
    res.status(200).json(res.locals.host)
})

app.post('/userlogin', 
userController.verifyUser,
cookieController.setSSIDCookie,
sessionController.startSession,
(req,res)=>{
    res.status(200).json(res.locals.user)}
)

app.post('/hostlogin', 
userController.verifyHost,
cookieController.setSSIDCookie,
sessionController.startSession, (req,res)=>{
    // res.send('user has signed in!')
    res.status(200).json(res.locals.host)
}
)

app.put('/rateuser',
userController.rateUser,
(req, res) => {
    res.send('rated')
})

module.exports = app;