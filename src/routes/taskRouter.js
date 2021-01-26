const express = require('express');
const router = new express.Router();
const Task = require('../models/Task');

router.post('/task',(req, res) => {
    const task = new Task(req.body);
    task.save().then(()=>{
        res.send(task)
    }).catch((error)=>{
        res.status(400);
        res.send(error);
    })
})

router.get('/task',(req, res)=>{
    Task.find({}).then((result)=>{
        res.send(result);
    }).catch((e)=>{
        res.status(500).send(e);
    })
})

router.get('/task/:id',(req, res)=>{
    let _id =  req.params.id;
    Task.findById(_id).then((result)=>{
        if(!result) return response.status(400).send();
        res.send(result);
    }).catch((e)=>{
        res.status(500).send(e);
    })
})

router.patch('/task/:id', async(req,res)=>{
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators: true});
        if(!task) return res.status(404).send();
        res.send(task);
    }catch(e){
        res.status(500).send(e);
    }
})

router.delete('/task/:id', async (req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task) return res.status(404).send();
        res.send(task);
    }catch(e){
        res.status(500).send();
    }
})



module.exports =router;