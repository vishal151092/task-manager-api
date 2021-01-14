const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User',{
    userName : {
        type : String,
        required : true
    },
    userEmail : {
        type : String,
        validate(value){
            if(!validator.isEmail(value)) throw new Error('Please enter a valid email ID');
        }
    },
    password : {
        type : String,
        required : true,
        minLenght : 6
    }
})

module.exports = User;