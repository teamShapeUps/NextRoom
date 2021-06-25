const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { MongoClient } = require('mongodb')

const MONGO_URI1 ='mongodb+srv://Travis:mojorisin6@restroomscluster.alasl.mongodb.net/restdb?retryWrites=true&w=majority';
// console.log(process.env)
mongoose.connect(process.env.MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'airpnp'
  })
    .then(() => console.log('Connected to Mongo DB.'))
    .catch(err => console.log(err));


const userSchema = new Schema({
 username: { type: String, required: true, unique: true},
 password: { type: String, required: true }
})

const hostSchema = new Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true }
   })

   const User = mongoose.model('user', userSchema);
   const Host = mongoose.model('host', hostSchema); 


   module.exports={
       User,
       Host

   }
   
