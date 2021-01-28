const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const auth = async (req, res, next)=>{
    
    try{
        const token =  req.header('Authorization').replace('Bearer ', '');
        const decodedToken = await jwt.verify(token, 'taskmanagervishal');
        const user = await User.find({_id: decodedToken._id , 'tokens.token' : token});
        
        if(!user){
            throw new Error();
        }
        req.user = user;
        next();
    }catch(e){
        console.log(e)
        res.status(401).send({error : 'Unauthorized Access'})
    }
}

module.exports = auth;

