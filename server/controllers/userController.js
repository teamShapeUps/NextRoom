const {User,Host} = require ('../Schemas/userSchema')

const UserController = {
    async newUser(req, res, next) {
        const { username, password, response } = req.body;
        
        try {
            const newUser = await User.create({username: username, password: password});
            
            res.locals.user = await newUser.save();
            res.locals.id = res.locals.user.id
            console.log(res.locals.user._id)
            if(response) res.send(newUser)
            next();
        }
        catch (err) {
            next({
                log: `UserController.newUser: ERROR: ${err}`
            })
        }
    },
    async newHost(req, res, next) {
        const { username, password, response } = req.body;
        
        try {
            const newUser = await Host.create({username: username, password: password});
            // res.status(200).send(newUser)
            res.locals.host = await newUser.save();
            if(response) res.send(newUser)
            next()

        }
        catch (err){
            next({
                log: `UserController.newHost: ERROR: ${err}`
            })
        }
    },
    async verifyUser(req, res, next) {
        const { username, password } = req.body;
        
        try {
            const user = await User.findOne({ username: username, password: password })
            if(!user) return res.status(400).send('User not found')
            // res.send(user)
            res.locals.user = user
            return next()
        }
        catch {
            next({
                log: `UserController.verifyUser: ERROR: ${err}`
            })
        }
    },
    async verifyHost(req, res, next) {
        const { username, password } = req.body;
        
        try {
            const host = await Host.findOne({ username: username, password: password })
            if(!host) return res.status(400).send('Host not found')
            // res.send(host)
            res.locals.host = host;
            next()
        }
        catch {
            next({
                log: `UserController.verifyHost: ERROR: ${err}`
            })
        }
    },

 
     rateUser (req, res, next) {
        const { username, rating } = req.body;
        const reducer = (accumulator, currentValue) => accumulator + currentValue;

        try {
            User.findOne({ username: req.params.username})
            .then((data) => {
                const ratings = data.ratings
                ratings.push(rating)
                User.replaceOne({username: username}, {rating: ratings.reduce(reducer), ratings: ratings})
                // res.send(user)
                next()
            })
            
        // const ratings = user.ratings
        // ratings.push(rating)
        // ratings.reduce(reducer)
        
        }
        catch (err) {
            next({
                log: `UserController.rateUser: ERROR: ${err}`
            })
        } 
    },
    
    async deleteUser(req, res, next) {
        try {
          const user = await User.findOne({ username: req.params.username });
          if(user){
            User.collection.deleteOne({username: req.params.username});
            // res.status(200).send('delete successful');
            next()
          }
          else {
            res.status(400).send('user not found');
          }
        }
        catch {
        //   res.status(400).send('delete unsuccessful');
        next({
            log: `UserController.deleteUser: ERROR: ${err}`
        })
        }
      },
}

module.exports = UserController