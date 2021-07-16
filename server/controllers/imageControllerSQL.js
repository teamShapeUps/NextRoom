const db = require('../models/NextroomModels');

const imageControllerSQL = {};

imageControllerSQL.getImage = async (req, res, next) => {
  const id = res.locals.token.id;
  try {
    const queryText = `SELECT imagefilename from rooms WHERE id = ($1)`;
    const values = [id];
    const result = await db.query(queryText, values);
    res.locals.imageFileName = result;
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = imageControllerSQL;
