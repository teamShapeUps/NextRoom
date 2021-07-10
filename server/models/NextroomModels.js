const { Pool } = require('pg');
require('dotenv').config();

const PG_URI = `postgres://ejmymjvl:m_WGKbMuk7OWnF_lm8xYrxbBOf9EcC6X@batyr.db.elephantsql.com/ejmymjvl`;

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    //console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};