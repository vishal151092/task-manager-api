const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
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
        minlenght : 6
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]
})

userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id : user._id.toString()}, 'taskmanagervishal')
    return token;
}

userSchema.statics.loginUser = async function(email, password){
    try{
        const user = await User.findOne({ userEmail : email});
    //console.log(user);
        if(!user) throw new Error('Login Failed!') 

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) throw new Error('Login Failed!')

        return user;
     }catch(e){
         throw new Error('Login Failed!')
     }
}


const User = mongoose.model('User', userSchema)

module.exports = User;