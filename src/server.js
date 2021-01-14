const express = require('express');
require('./db/mongoose');
const User = require('./models/Users');
const Task = require('./models/Task');

const app = express();
const port = process.env.PORT || 3000;

app.get('/',(req, res)=>{
    res.send('On home Page');
})

app.listen(port, ()=>{
    console.log(`Server is up and running on port ${port}`);
})