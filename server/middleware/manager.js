const { User } = require("../controllers/api/v0/user/models/user");

let manager =  (req,res,next) => {

    let id = req.user.id;

    User.isManager(id,(err,isManager) => {

        if(err) return res.status(403).send(err);
        if(isManager) {
            next();
        } else {
            return res.json({
                isManager: false
            })
        }

    })
}

module.exports = {manager};