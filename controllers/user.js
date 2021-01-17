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

exports.getHost=(req, res)=>{
    console.log(req.params.id);
    User.find({_id: req.params.id}, (host, err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Host found: ", host);
            res.json({host: host});
        }
    })
}


exports.getUser = (req, res)=>{
    res.json(req.profile);
}
