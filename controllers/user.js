const User = require("../models/user");

exports.userById = (req, res, next, id)=>{
    User.findById(id).exec((err, user)=>{
        if(err || !user){
            res.json({
                error: "User not Found"
            })
        }
        req.profile = user;
        next();
    })
}

