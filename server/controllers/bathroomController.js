const { Bathroom ,Host} = require ('../Schemas/userSchema')

const bathroomController = {
    async addBathroom(req, res, next) {
        const {address, zipcode, response, hostId, imageFileName} = req.body;
        
        console.log("request is", req.body)
        console.log("req.sessionID is", req.sessionID)
        try {
        const newBathroom = await Bathroom.create({
            hostId: hostId,
            address: address,
            zipcode: zipcode,
            imageFileName: imageFileName
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

    async getHostBathrooms (req, res, next) {
        const { _id } = req.body
        
        // console.log("hostId", hostId)
        try{
        const hostBathrooms = await Bathroom.find({ hostId: _id}, (err, bathrooms) => {
            if (err) return next('Error in bathroomController.getHostBathrooms' + JSON.stringify(err))
            console.log('bathrooms', bathrooms)
       return bathrooms
        })
        .exec()
        console.log(hostBathrooms)
        res.locals.bathrooms = hostBathrooms
        // res.locals.bathrooms = userBathrooms
        next()
        }
        catch {
            next({
                log: "bathroomController.getHostBathrooms"
            })
        }
    },

    async addbathroompic(req, res, next) {
        const { pic } = req.body;
        try{
            const bathroom = await Bathroom.find({ hostId: _id}, (err, bathroom) => {
                if (err) return next('Error in bathroomController.getHostBathrooms' + JSON.stringify(err))
                console.log('bathroom', bathroom)
           return bathroom
            })
            .exec()
            const pics = bathroom[pictures]
            pics.push(pic)
            bathroom.overwrite({pictures: pics})
            await bathroom.save()
            console.log(bathroom)
            res.locals.bathroomPics = pics
            // res.locals.bathrooms = userBathrooms
            next()
            }
            catch {
                next({
                    log: "bathroomController.getHostBathrooms"
                })
            }

},

    async getNearBathrooms (req, res, next) {
        const {longitude, latitude} = req.body;
        try {
            const bathrooms = await Bathroom.find({
              $near: [longitude, latitude],
              $maxDistance: .10},
            (err, bathroom) => {
                if (err) return next('Error in bathroomController.getNearBathrooms' + JSON.stringify(err))
                return bathroom
            })
            .exec()
            console.log(bathrooms)
            res.locals.nearBathrooms = bathrooms
            next()
        }
        catch(err) {
            next(err)
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

}

module.exports = bathroomController