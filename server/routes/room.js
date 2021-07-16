const express = require('express');
const cookieControllerSQL = require('../controllers/cookieControllerSQL');
const sessionControllerSQL = require('../controllers/sessionControllerSQL');
const roomControllerSQL = require('../controllers/roomControllerSQL');

const router = express.Router();


router.get('/', (req, res) => {
  res.status(200).json("works");
});

router.post('/addroom', roomControllerSQL.addRooms, (req, res) => {
  res.status(200).json(res.locals.rooms);
});

// app.put('/addbathroompic',
// bathroomController.)

// app.put('/rateuser',
// userController.rateUser,
// (req, res) => {
//     res.send('rated')
// })

router.delete('/deleteroom', roomControllerSQL.deleteRooms, (req, res) => {
  res.status(200).json('bathroom deleted');
});

router.get('/getroom', roomControllerSQL.getRooms, (req, res) => {
  // console.log(res.locals.bathrooms)
  res.status(200).json(res.locals.rooms);
});

// app.post('/addbathroompic',
// bathroomController.addbathroompic,
// (req, res) => {
//     res.status(200).send(res.locals.bathroomPics)
// })

router.post('/getnearooms', roomControllerSQL.getNearRooms, (req, res) => {
  res.status(200).send(res.locals.nearBathrooms);
});

router.post('/updateroom', roomControllerSQL.updateroom, (req, res) => {
  res.status(200).json(res.locals.updatedRoom);
});

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
