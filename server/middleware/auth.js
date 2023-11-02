const { User } = require("../controllers/api/v0/user/models/user");


let auth =  (req,res,next) => {

    try {

        let token = req.cookies.authToken ||'';
        User.findByToken(token,(err,user) => {
            if(err) return res.status(400).send(err);
            if(!user) return res.json({
                error:true
            });
            req.token = token;
            req.user = user;
            next();
        });
        
    } catch (err) {
        console.log(err);
        return res.json({ error:true});
    }
    

}

module.exports = {auth};