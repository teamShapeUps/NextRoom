const db = require('../models/NextroomModels.js');

const createTableController = {};

createTableController.createRooms = async (req, res, next) => {
  try {
    const initialCreateTable = {
      text: `CREATE TABLE rooms(
      id UUID,
      title VARCHAR,
      description VARCHAR,
      price FLOAT,
      address VARCHAR,
      imageFileName VARCHAR,
      available BOOLEAN DEFAULT true,
      location_long FLOAT,
      location_lat FLOAT,
      createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      longitude INT,
      latitude INT,
      zipcode INT
    )`,
    };

    db.query(initialCreateTable);
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = createTableController;
