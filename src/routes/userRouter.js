const express = require('express');
const router = new express.Router();
const User = require('../models/Users');

router.post('/user', (req,res)=>{
    const user = new User(req.body);
    user.save().then(()=>{
        res.send(user);
    }).catch((error)=>{
        res.status(400);
        res.send(error);
    })
})

router.get('/user', async (req, res)=>{

    try{
        const users =  await User.find({});
        
        res.send(users);
    }catch(e){
        res.status(500).send(e);
    }
})

router.get('/user/:id', async (req, res)=>{
    try{
        const user = await User.findById(req.params.id);

        if(!user) return res.status(404).send();
        res.send(user);
    }catch(e){
        res.status(500).send(e)
    }
})

router.put('/user/:id', async (req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators: true});
        if(!user) return res.status(404).send();
        res.send(user);
    }catch(e){
        res.status(500).send();
    }
})

router.delete('/user/:id', async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) return res.status(404).send();
        res.send(user);
    }catch(e){
        res.status(500).send();
    }
})



module.exports =router;