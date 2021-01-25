const express = require('express');
require('./db/mongoose');
const User = require('./models/Users');
const Task = require('./models/Task');
const { response } = require('express');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());  
app.get('/',(req, res)=>{
    res.send('On home Page');
})

app.post('/task',(req, res) => {
    const task = new Task(req.body);
    task.save().then(()=>{
        res.send(task)
    }).catch((error)=>{
        res.status(400);
        res.send(error);
    })
})

app.get('/task',(req, res)=>{
    Task.find({}).then((result)=>{
        res.send(result);
    }).catch((e)=>{
        res.status(500).send(e);
    })
})

app.get('/task/:id',(req, res)=>{
    let _id =  req.params.id;
    Task.findById(_id).then((result)=>{
        if(!result) return response.status(400).send();
        res.send(result);
    }).catch((e)=>{
        res.status(500).send(e);
    })
})

app.patch('/task/:id', async(req,res)=>{
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators: true});
        if(!task) return res.status(404).send();
        res.send(task);
    }catch(e){
        res.status(500).send(e);
    }
})

app.delete('/task/:id', async (req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task) return res.status(404).send();
        res.send(task);
    }catch(e){
        res.status(500).send();
    }
})

app.post('/user', (req,res)=>{
    const user = new User(req.body);
    user.save().then(()=>{
        res.send(user);
    }).catch((error)=>{
        res.status(400);
        res.send(error);
    })
})

app.get('/user', async (req, res)=>{

    try{
        const users =  await User.find({});
        
        res.send(users);
    }catch(e){
        res.status(500).send(e);
    }
})

app.get('/user/:id', async (req, res)=>{
    try{
        const user = await User.findById(req.params.id);

        if(!user) return res.status(404).send();
        res.send(user);
    }catch(e){
        res.status(500).send(e)
    }
})

app.put('/user/:id', async (req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators: true});
        if(!user) return res.status(404).send();
        res.send(user);
    }catch(e){
        res.status(500).send();
    }
})

app.delete('/user/:id', async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) return res.status(404).send();
        res.send(user);
    }catch(e){
        res.status(500).send();
    }
})

app.listen(port, ()=>{
    console.log(`Server is up and running on port ${port}`);
})