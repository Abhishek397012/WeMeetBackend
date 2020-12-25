const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    email: {
        type: String, 
        required: true
    }, 
    profilePicUrl: {
        type: String, 
        required: false
    }, 
    designation: {
        type: String, 
        requried: false
    },
    organization: {
        type: String, 
        required: false
    }, 
    city: {
        type: String, 
        required: false
    }, 
    aboutMe: {
        type: String, 
        required: false
    }, 
    country: {
        type: String, 
        required: false
    }, 
    eventsHosted: {
        type: Array, 
        default: []
    }
}, {timestamps: true});


module.exports = mongoose.model("user", UserSchema);