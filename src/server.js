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

app.post('/user', (req,res)=>{
    const user = new User(req.body);
    user.save().then(()=>{
        res.send(user);
    }).catch((error)=>{
        res.status(400);
        res.send(error);
    })
})

app.listen(port, ()=>{
    console.log(`Server is up and running on port ${port}`);
})