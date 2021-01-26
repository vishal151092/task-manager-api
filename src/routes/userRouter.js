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
    const updates = Object.keys(req.body);
    const allowedUpdates = ['userName', 'userEmail', 'password'];
    const isValidUpdate = updates.every((update)=> allowedUpdates.includes(update));

    if(!isValidUpdate) return res.status(400).send({ error : 'invalid update!'});

    try{
        // commenting to use middleware in update API as well
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators: true});
        const user = await User.findById(req.params.id);
        console.log(user);
        updates.forEach((update)=>{
            user[update] = req.body[update];
        });
         await user.save();
        
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

router.post('/user/login', async (req, res)=>{
    try{
        const user = await User.loginUser(req.body.userEmail, req.body.password);
        //if(!user) throw new Error('Login Failed');
        res.send(user);
    }catch(e){
        res.status(500).send({error : "Login Failed"});
    }
})

module.exports =router;