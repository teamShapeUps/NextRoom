const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { MongoClient } = require('mongodb')
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
 password: { type: String, required: true },
 name: { type: String},
 bio: { type: String },
 rating: { type: Number, default: 0},
 ratings: { type: Array, default: []},
 reviews: { type: Array }
 
})

const hostSchema = new Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true }
   })

const bathroomSchema = new Schema ({
    hostId: { type: String },
    available: { type: Boolean},
    ratings: { type: Array },
    reviews : { type: Array },
    
})

const appointmentSchema = new Schema({
bathroomId: { type: String }
})
   const User = mongoose.model('user', userSchema);
   const Host = mongoose.model('host', hostSchema); 
    const Bathroom = mongoose.model('bathroom', bathroomSchema)
    const Appointment = mongoose.model('appointment', appointmentSchema)
  

    userSchema.pre('save', async function(next){

        try{
          const hash = await bcrypt.hash(this.password, SALT_WORK_FACTOR )
          this.password = hash
          next()
        }catch (err){
          next({
            err
          })
        }
      })
      
    
      userSchema.methods.comparison = async function (plainTextPasswd) { 
        console.log('in comparison')
      
        try{
          return await bcrypt.compare(plainTextPasswd,this.password)
          
        }catch(err){
          console.log(err)
        }
      };
  
      hostSchema.pre('save', async function(next){

        try{
          const hash = await bcrypt.hash(this.password, SALT_WORK_FACTOR )
          this.password = hash
          next()
        }catch (err){
          next({
            err
          })
        }
      })
      
    
      hostSchema.methods.comparison = async function (plainTextPasswd) { 
        console.log('in comparison')
      
        try{
          return await bcrypt.compare(plainTextPasswd,this.password)
          
        }catch(err){
          console.log(err)
        }
      };
  



  
    module.exports={
       User,
       Host,
       Bathroom,
       Appointment

   }
   
