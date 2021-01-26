const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    }
})

userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

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