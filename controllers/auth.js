const User = require('../models/user');
const {errorHandler} = require('../helpers/dbErrorHnadler')
const jwt = require('jsonwebtoken'); // To generate signed Token
const expressJwt = require('express-jwt'); // For authorization check
const config = require("config");
const jwtSecret = config.get("jwtSecret");


exports.login = async (req, res)=>{
    const {
        name, 
        fid 
    } = req.body;
    try{
        // Find the user with this firebase id 
        let user = await User.findOne({fid});
        // If user does not exist then save it into the database 
        if(!user){
            newUser = new User({ name, fid });
            await newUser.save();
            user = newUser;
        }
        // Generate a signed token with user id and secret
        const token = jwt.sign({_id: user._id}, jwtSecret)
        // Persist the token as 't' in cookie with expiry date
        res.cookie('t', token, {expire: new Date() + 1800});
        // return response with user and token to frontend client
        res.json({ token, user });
    }catch(err){
        console.log(err.message);
        res.status(400).json({
            error: err.message
        })
    }
}

exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({
        message: "Signout Success"
    })
}

// Middleware to protect routes
exports.requireSignin = expressJwt({
    secret: jwtSecret,
    algorithms: ["HS256"],
    userProperty: "auth",
  });
