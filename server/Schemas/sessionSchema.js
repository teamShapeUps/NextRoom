const mongoose = require('mongoose');

const { Schema } = mongoose;

const sessionSchema = new Schema({
  cookieID: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 24 * 60 * 60 * 1000, default: Date.now },
});
// 24 * 60 * 60 * 1000 is 24 hours
const Session = mongoose.model('Session', sessionSchema);
module.exports = {
  Session,
};
