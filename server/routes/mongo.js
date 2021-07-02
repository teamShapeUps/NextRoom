const express = require('express');
const userController = require('../controllers/userController')
const cookieController = require('../controllers/cookieController')
const sessionController = require('../controllers/sessionController')
const bathroomController = require ('../controllers/bathroomController')
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
    res.status(200).json(res.locals.user)
})

app.post('/userlogin', 
// sessionController.isLoggedIn,
userController.verifyUser,
cookieController.setSSIDCookie,
sessionController.startSession,
(req,res)=>{
    res.status(200).json(res.locals.user)}
)

app.post('/hostlogin', 
// sessionController.isLoggedIn,
userController.verifyHost,
cookieController.setSSIDCookie,
sessionController.startSession, (req,res)=>{
    // res.send('user has signed in!')
    res.status(200).json(res.locals.user)
}
)

app.post('/addbathroom',
bathroomController.addBathroom,
(req, res) => {
    res.status(200).json(res.locals.bathroom)
})
// app.put('/addbathroompic',
// bathroomController.)

// app.put('/rateuser',
// userController.rateUser,
// (req, res) => {
//     res.send('rated')
// })

app.get('/getbathrooms',
bathroomController.getHostBathrooms,
(req,res)=>{
    // console.log(res.locals.bathrooms)
    res.status(200).send(res.locals.bathrooms)
})

app.post('/addbathroompic',
bathroomController.addBathroomPic,
(req, res) => {
    res.status(200).send(res.locals.bathroomPics)
})

app.post('/getnearbathrooms', 
bathroomController.getNearBathrooms,
(req, res) => {
    res.status(200).send(res.locals.nearBathrooms)
})

app.post('/updateBathroom',
bathroomController.updateBathroom,
(req, res) => {
    res.status(200).send(res.locals.updatedBathroom)
})

app.use("*",(req,res)=>{
    res.status(404).send("Page Not Found!")
})

app.use((err,req,res,next)=>{
    const defaultErr ={
        log:"Caught unknown Middleware"
    }
const errorObj = Object.assign({},defaultErr,err)
console.log(errorObj)
return res.status(500).send("Server Error")

});

module.exports = app;