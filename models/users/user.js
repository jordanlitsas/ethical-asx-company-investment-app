const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        default:"",
        required: true
    },
    email: {
        type: String,
        default:"",
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        default:"",
        required: true,
    },
    password: {
        type: String,
        default:"",
        required: true,
    },
})

var userData = mongoose.model('userdata', userSchema);
module.exports = userData;