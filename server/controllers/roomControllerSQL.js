const { MoveToInboxTwoTone } = require('@material-ui/icons');
const db = require('../models/NextroomModels.js');
const geocoder = require('../utils/geocoder');
const fs = require('fs');
const path = require('path');

const roomControllerSQL = {};

// YOU HAVE TO RUN cookiesControllerSQL.checkCookie BEFORE ANY OF THESE MIDDLEWARE FUNCS!

roomControllerSQL.addRooms = async (req, res, next) => {

  try {
    const { address, zipcode, title, description, imageFileName, price } = req.body;
    const id = res.locals.token.id;


    //const location = await geocoder.geocode(address);
    //console.log(location[0].formattedAddress);

    let location = [];
    const geocoderesult = await geocoder.geocode(req.body.address)
    if(geocoderesult.length > 0){
      location = geocoderesult;
    }
    
    let latitude = '';
    if(location[0].latitude){
      latitude = location[0].latitude
    }
    let longtitude = '' 
    if(location[0].longitude){
      longtitude = location[0].longitude
    }

    const query = `INSERT INTO rooms (id, title, address, zipcode, description, imageFileName, longitude, latitude, price)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
    const values = [id, title, address, zipcode, description, imageFileName, longtitude, latitude, price]; //imageFileName might be different
    const queryResult = await db.query(query, values);

    res.locals.rooms = queryResult.rows[0];

    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
  next();
};

roomControllerSQL.getRooms = async (req, res, next) => {
  try {
    const id = res.locals.token.id;

    const query = `SELECT * FROM rooms WHERE id = ($1)`;
    const queryResult = await db.query(query, [id]);
    res.locals.rooms = queryResult.rows;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

roomControllerSQL.getAllRooms = async (req, res, next) => {
  try {
    //const id = res.locals.token.id;

    const query = `SELECT * FROM rooms`;
    const queryResult = await db.query(query);
    res.locals.allrooms = queryResult.rows;
    
    //const stringResult = queryResult.rows.toString();
    const stringArray = JSON.stringify(queryResult.rows);

    fs.writeFile(path.resolve(__dirname, '../../client/Components/location.json'), `${stringArray}`,  err => {
      if (err) {
        console.error(err)
        return
      }
    })


    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

roomControllerSQL.getNearRooms = async (req, res, next) => {
  let { longitude, latitude, miles } = req.body;
  longitude = Number(longitude);
  latitude = Number(latitude);
  miles = Number(miles) / 68.703;
  console.log('miles', miles);
  if (miles === undefined) miles = 10 / 68.703;
  try {
    const query = `SELECT * FROM rooms`;
    // data.rows[0]
    // rows [{long:00}, {}, {}, {}, {}]
    let bathroomsArr = []
    // bathrooms.rows.forEach(el =>{
    //     if((el['location']['coordinates'][0] < longitude+miles &&
    //     el['location']['coordinates'][0] > longitude-miles) &&
    //     (el['location']['coordinates'][1] < latitude+miles &&
    //     el['location']['coordinates'][1] > latitude-miles) &&
    //     el['location']['coordinates'][1]) {
    //         bathroomsArr.push(el)
    //     }
    // })

    // res.locals.nearBathrooms = bathroomsArr
    next();
  } catch (err) {
    // next(`error in bathroomController.getNearBathrooms: ${err}`)
    next({ err });
  }
};

roomControllerSQL.updateroom = async (req, res, next) => {
  const {id, title, address, description, price} = req.body;
  try {
    
    let location = [];
    const geocoderesult = await geocoder.geocode(req.body.address)
    if(geocoderesult.length > 0){
      location = geocoderesult;
    }
    
    //console.log(req.body)
    //Room info requires id, title, description, address, price, type, logitude, latitude, formattedAddress, imageFileName

    //const coordinates = [location[0].longitude, location[0].latitude];
    //const formattedAddress = location[0].formattedAddress;

    //console.log(location[0].formattedAddress);

    let latitude = 0;
    if(location.length>0){
      latitude = location[0].latitude
    }
    let longtitude = 0;
    if(location.length>0){
      longtitude = location[0].longitude
    }


    const query = `UPDATE rooms
    SET description = ($1), price = ($2), address = ($3), longitude = ($4), latitude = ($5)
    WHERE id = ($6) AND title = ($7)`;
    const value = [description, price, address, longtitude, latitude, id, title];
    const result = await db.query(query, value);
    res.locals.updatedRoom = result.rows[0]; 
    next()
  } catch (err) {
    console.log(err);
    next(err);
  }
};

roomControllerSQL.deleteRooms = async (req, res, next) => {
  //const id = res.locals.token.id;
  const id = req.body.id;
  const title = req.body.title;
  //console.log(id, title)
  const values = [id, title]
  try {
    const query = `DELETE FROM rooms WHERE id = $1 AND title = $2`;
    await db.query(query, values);
    next()
  } catch (err) {
    console.log(err);
    next(err);
  }

};

module.exports = roomControllerSQL;
