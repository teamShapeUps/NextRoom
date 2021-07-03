const mongoose = require('mongoose');

const { Schema } = mongoose;
const { MongoClient } = require('mongodb');

const geocoder = require('../utils/geocoder');

//
mongoose.connect(process.env.MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'airpnp',
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

// Schemas
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  bio: { type: String },
  rating: { type: Number, default: 0 },
  ratings: { type: Array, default: [] },
  reviews: { type: Array },
  profilepicture: { type: String },

});

const hostSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const bathroomSchema = new Schema({
  hostId: { type: String },
  title: String,
  header: String,
  description: String,
  imageFileName: String,
  address: {
    type: String,
    required: [true, 'Please add an address'],
  },
  available: { type: Boolean, default: true },
  ratings: { type: Array },
  reviews: { type: Array },
  pictures: { type: Array },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      // required: true
    },
    coordinates: {
      type: [Number],
      // required: true
    },
    formattedAddress: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  coordinates: { type: String },
  zipcode: { type: String },

});

const appointmentSchema = new Schema({
  bathroomId: { type: String },
  userId: { type: String },
  username: { type: String },

}, { timestamps: { createdAt: 'created_at' } });

// Geocode & create location
bathroomSchema.pre('save', async function (next) {
  const location = await geocoder.geocode(this.address);
  this.location = {
    type: 'point',
    coordinates: [location[0].longitude, location[0].latitude],
    formattedAddress: location[0].formattedAddress,
  };
  console.log(location);

  // Do not save address
  this.address = undefined;
  next();
});
// model Schemas
const User = mongoose.model('user', userSchema);
const Host = mongoose.model('host', hostSchema);
const Bathroom = mongoose.model('bathroom', bathroomSchema);
const Appointment = mongoose.model('appointment', appointmentSchema);

module.exports = {
  User,
  Host,
  Bathroom,
  Appointment,

};
