
const { Bathroom, Appointment } = require('../Schemas/userSchema');

const appointmentController = {

async createAppointment(req,res,next) {
    console.log(req.body)
const { _id, bathroom_id,username } = req.body
if ( _id === null|| bathroom_id === null ||username=== null ){
    return res.status(400).send('missing data to create appointment')
}
try{
   //creates appointment 
    let app = await Appointment.create({bathroomId: bathroom_id, userId: _id,username:username})

    //should make avalibale to false and be set to true in 30 minutes
    let makeunavailable = await Bathroom.findByIdAndUpdate({_id: bathroom_id},{available :false})    
    setTimeout(async function()
    {let makeavailable = await Bathroom.findByIdAndUpdate({_id: bathroom_id},{available :true})},1800000)
    
    res.locals.newApp = app;
    next();
}catch(error){
    next({
    log:"appointmentController.createApp" , error
    })}
},


 async getAppointments(req,res,next){
     const {_id}= req.body
     try{
        let app =[];
         bathrooms = await Bathroom.find({hostId :_id})
         console.log("bath", bathrooms)
         if ( bathrooms.length ===0){
           return  res.send("Host has no bathrooms")
         }else{
            
             for(let i =0;i< bathrooms.length;i++){
                appointments = await Appointment.find({bathroomId:bathrooms[i].bathroomId})
                    console.log(appointments)
                    app.push(appointments)
             }
             res.locals.getAppointments = app;
             next();
        }
         

     }catch(error){
         next({
           log: "appointmentController.getAppointment", error  
         })
     }
 }

}
module.exports = appointmentController