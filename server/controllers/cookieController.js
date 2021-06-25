const  cookieController ={};

cookieController.setCookies = async (req, res, next)=>{
    res.cookie('cookie',Math.floor(Math.random() * 99))
   next();
}


module.exports = cookieController;
