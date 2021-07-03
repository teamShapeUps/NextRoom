const { Bathroom , Host} = require ('../Schemas/userSchema')

const bathroomController = {
    async addBathroom(req, res, next) {

        const {address, zipcode, title, description, imageFileName} = req.body;
        const hostId = req.cookies.ssid;
         const picArray = [];
         picArray.push(imageFileName)
        // console.log("req.sessionID is", req.sessionID)

        const newBathroom = await Bathroom.create({
            hostId: hostId,
            title: title,
            description: description,
            address: address,
            zipcode: zipcode,
            imageFileName: imageFileName,
            pictures: picArray
        })
        //res.locals.bathrooms = await newBathroom.save()
        if (newBathroom) {
            console.log('New Bathroom made it!')
            res.locals.bathroom = newBathroom
            return next();
        }else {
            return next({
                log: `bathroomController.addBathroom: ERROR: ${err}`
            })
        }
    },

    async getHostBathrooms (req, res, next) {

        const _id  = req.cookies.ssid
        console.log('backend id', _id)
        //console.log("hostId", hostId)
        try {
        
        const hostBathrooms = await Bathroom.find({ hostId: _id})
        
        if (!hostBathrooms) return next('Error in bathroomController.getHostBathrooms' + JSON.stringify(err))
    
        //console.log(hostBathrooms)
        res.locals.bathrooms = hostBathrooms
        return next()
        }
        
        catch {
            next({
                log: "bathroomController.getHostBathrooms"
            })
        }
    },
    

    async getNearBathrooms (req, res, next) {
        let {longitude, latitude, miles} = req.body;
        longitude = Number(longitude)
        latitude = Number(latitude)
        miles = Number(miles)/68.703
        console.log('miles', miles)
        if(miles === undefined) miles = 10/68.703
        try {
            const bathrooms = await Bathroom.find({}, (err, potty) => {
                return potty
            })
            .exec()
            let bathroomsArr = []
            bathrooms.forEach(el =>{
                if((el['location']['coordinates'][0] < longitude+miles && 
                el['location']['coordinates'][0] > longitude-miles) &&
                (el['location']['coordinates'][1] < latitude+miles && 
                el['location']['coordinates'][1] > latitude-miles) && 
                el['location']['coordinates'][1]) {
                    bathroomsArr.push(el)
                }
            })
          
            res.locals.nearBathrooms = bathroomsArr
            next()
        }
        catch(err) {
            next(`error in bathroomController.getNearBathrooms: ${err}`)
        }
    },

    async addbathroompic(req, res, next) {
        const { pic, _id } = req.body;
        try{
            const bathroom = await Bathroom.findOne({ hostId: _id}, (err, bathroom) => {
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
    async updateBathroom(req, res, next){
        const {_id, title, address, description, price, imageFileName} = req.body;

        const filter = {_id}
        const update = { title , address, description, price, imageFileName }
        const updatedBathroom = await Bathroom.findOneAndUpdate(filter, update, {new: true});

        if(updatedBathroom){
            res.locals.updatedBathroom = updatedBathroom
            return next()
        } else {
            return res.status(401).json('Error updating!')
        }
    },

    async deleteBathroom (req,res,next){
        try{
            const deletedBathroom = await Bathroom.deleteOne({
            '._id':req.body._id
            })
        }catch(error){
            console.log("deleteBathroom ", error)
        }
    }

}

module.exports = bathroomController