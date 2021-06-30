const { Bathroom } = require ('../Schemas/userSchema')

const bathroomController = {
    async addBathroom(req, res, next) {
        const {address, zipcode, response} = req.body;
        
        console.log("request is", req.body)
        try {
        const newBathroom = await Bathroom.create({
            // hostId: res.locals.host._id,
            address: address,
            zipcode: zipcode
        })
        //res.locals.bathrooms = await newBathroom.save()
        if (response) res.send(newBathroom)
        
        next();
        }
        catch (err){
            next({
                log: `bathroomController.addBathroom: ERROR: ${err}`
            })
        }
    },


    async deleteBathroom (req,res,next){
        try{
            const deletedBathroom = Bathroom.deleteOne({
            '._id':req.params._id
            })
        }catch(error){
            console.log("deleteBathroom ", error)
        }
    }
// async addbathroompic(req, res, next) {
//     const bathroom = await Bathroom 
// }
}

module.exports = bathroomController