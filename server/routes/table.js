const express = require('express');
const router = express.Router();

const createTableController = require('../controllers/createTableController');

router.post('/room', createTableController.createRooms, (req, res)=>{
  res.status(200).send("Room created!")
})

module.exports = router;