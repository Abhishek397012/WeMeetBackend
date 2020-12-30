const User = require("../models/user");

exports.userById = (req, res, next, id)=>{
    User.findOne({fid: id}).exec((err, user)=>{
        if(err || !user){
            res.json({
                error: "User not Found"
            })
        }
        req.profile = user;
        next();
    })
}

exports.update = (req, res) =>{
    console.log(req.body);
}

