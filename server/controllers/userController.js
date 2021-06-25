const {User,Host} = require ('../Schemas/userSchema')

const UserController = {
    async newUser(req, res) {
        const { username, password } = req.body;
        
        try {
            const newUser = await User.create({username: username, password: password});
            res.status(200).send(newUser)
        }
        catch (err){
            res.send(err)
        }
    },
    async newHost(req, res) {
        const { username, password } = req.body;
        
        try {
            const newUser = await Host.create({username: username, password: password});
            res.status(200).send(newUser)
        }
        catch (err){
            res.send(err)
        }
    },
    async verifyUser(req, res) {
        const { username, password } = req.body;
        
        try {
            const user = await User.findOne({ username: username, password: password })
            if(!user) return res.status(400).send('User not found')
            res.send(user)
        }
        catch {
            res.send('User not found')
        }
    },
    async verifyHost(req, res) {
        const { username, password } = req.body;
        
        try {
            const host = await Host.findOne({ username: username, password: password })
            if(!host) return res.status(400).send('Host not found')
            res.send(host)
        }
        catch {
            res.send('Host not found')
        }
    },
    async deleteUser(req, res) {
        try {
          const user = await User.findOne({ username: req.params.username });
          if(user){
            User.collection.deleteOne({username: req.params.username});
            res.status(200).send('delete successful');
          }
          else {
            res.status(400).send('user not found');
          }
        }
        catch {
          res.status(400).send('delete unsuccessful');
        }
      },
}

module.exports = UserController