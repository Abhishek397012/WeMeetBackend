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
    User.findOneAndUpdate({fid: req.profile.fid}, {$set: req.body}, {new: true}, (err, user)=>{
        if(err){
            res.status(400).json({
                error: "Unable to Edit the details"
            })
        }
        res.json(user);
    })
}


exports.getUser = (req, res)=>{
    res.json(req.profile);
}
