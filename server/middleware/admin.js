const { User } = require("../controllers/api/v0/user/models/user");

let admin =  (req,res,next) => {

    let id = req.user.id;

    User.isAdmin(id,(err,isAdmin) => {

        if(err) return res.status(403).send(err);
        if(isAdmin) {
            next();
        } else {
            return res.json({
                isAdmin: false
            })
        }

    })

}

module.exports = {admin};