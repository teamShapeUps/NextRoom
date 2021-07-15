const { resourceLimits } = require('worker_threads');
const db = require('../models/NextroomModels.js');
const { getHostBathrooms } = require('./bathroomController.js');

const appointmentControllerSQL = {}

// YOU HAVE TO RUN cookiesControllerSQL.checkCookie BEFORE ANY OF THESE MIDDLEWARE FUNCS!


appointmentControllerSQL.createAppointment = (req, res, next) =>{
  const {bathroom_id, username } = req.body;
  const id = res.locals.token.id;
  if (id === null || bathroom_id === null || username === null) {
    return res.status(400).send('missing data to create appointment');
  }
  try {
    const appQuery = `INSERT INTO appointment(id, username, bathroom_id)
    VALUES($1, $2, $3)`
    const values = [id, username, bathroom_id];
    const result = await db.query(appQuery, values);

    const roomQuery = `UPDATE rooms
    SET availability = ($1)
    WHERE id = ($2)`
    const value = [false, id];
    await db.query(roomQuery, value);

    // should make avalibale to false and be set to true in 30 minutes
    
    setTimeout(async()=>{
      const roomQuery = `UPDATE rooms
      SET availability = ($1)
      WHERE id = ($2)`
      const value = [true, id];
      await db.query(roomQuery, value);
    }, 1800000)

    res.locals.newApp = result.rows[0]
    next();
   }catch(err){
     console.log(err);
     next(err)
   }
}


appointmentControllerSQL.getAppointments = (req, res, next)=>{
  const id = res.locals.token.id;
  try{
    const app = []
    const roomQuery = `SELECT * FROM rooms WHERE id = ($1)`
    const result = await db.query(roomQuery, [id]);

    // result might be undefined not 0. 
    if(result.rows.length === 0){
      console.log('No rooms');
      return res.send('Host has no bathrooms')
    }

    // result.rows = [{},{},{},{}]
    for(let i = 0; i<result.rows.length; i++){
      const roomQuery = `SELECT * FROM rooms WHERE id = ($1)`
    }
    

  }catch(err){
    console.log(err);
    next(err);
  }

}



module.exports = appointmentControllerSQL;