const express = require('express');
const cookiesControllerSQL = require('../controllers/cookieControllerSQL');
const sessionControllerSQL = require('../controllers/sessionControllerSQL');
const roomControllerSQL = require('../controllers/roomControllerSQL');

const router = express.Router();


router.get('/', (req, res) => {
  res.status(200).json("works");
});

router.post('/addroom', cookiesControllerSQL.checkCookie, roomControllerSQL.addRooms, (req, res) => {
  res.status(200).json(res.locals.rooms);
});

// app.put('/addbathroompic',
// bathroomController.)

// app.put('/rateuser',
// userController.rateUser,
// (req, res) => {
//     res.send('rated')
// })

router.delete('/deleteroom', cookiesControllerSQL.checkCookie, roomControllerSQL.deleteRooms, (req, res) => {
  res.status(200).json('bathroom deleted');
});

router.get('/getroom', cookiesControllerSQL.checkCookie, roomControllerSQL.getRooms, (req, res) => {
  // console.log(res.locals.bathrooms)
  res.status(200).json(res.locals.rooms);
});

// app.post('/addbathroompic',
// bathroomController.addbathroompic,
// (req, res) => {
//     res.status(200).send(res.locals.bathroomPics)
// })

router.post('/getnearooms', cookiesControllerSQL.checkCookie, roomControllerSQL.getNearRooms, (req, res) => {
  res.status(200).send(res.locals.nearBathrooms);
});

router.post('/updateroom', cookiesControllerSQL.checkCookie, roomControllerSQL.updateroom, (req, res) => {
  res.status(200).json(res.locals.updatedRoom);
});

router.get('/getallrooms', cookiesControllerSQL.checkCookie, roomControllerSQL.getAllRooms, (req, res)=>{
  res.status(200).json(res.locals.allrooms);
})

// router.get('/appointments', getAppointments, (req, res) => {
//   res.status(200).send(res.locals.getAppointments);
// });

// router.get('/usersappointments', getReservations, (req, res) => {
//   res.status(200).send(res.locals.getReservations);
// });

// router.use('*', (req, res) => {
//   res.status(404).send('Page Not Found!');
// });

module.exports = router;
