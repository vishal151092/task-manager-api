const express = require('express');
require('./db/mongoose');
const User = require('./models/Users');
const Task = require('./models/Task');
//const { response } = require('express');
const userRouter = require('./routes/userRouter');
const taskRouter = require('./routes/taskRouter');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());  
app.use(userRouter);
app.use(taskRouter);

app.get('/',(req, res)=>{
    res.send('On home Page');
})

app.listen(port, ()=>{
    console.log(`Server is up and running on port ${port}`);
})