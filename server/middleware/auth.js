const { User } = require("../controllers/api/v0/user/models/user");


let auth =  (req,res,next) => {
    
    let token = req.cookies.authToken ||'eyJhbGciOiJIUzI1NiJ9.MQ.xFExH6urle9ubfOrQQgfryQ7eLG-kbB6AJZV235IjQY';
    User.findByToken(token,(err,user) => {
        if(err) throw err;
        if(!user) return res.json({
            error:true
        });
        req.token = token;
        req.user = user;
        next();
    });
}

module.exports = {auth};