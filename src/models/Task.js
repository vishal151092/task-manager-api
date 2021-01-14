const mongoose = require('mongoose');

const Task = mongoose.model('Task',{
    description: {
        type : String,
        required : true,
        minLenght : 5
    },
    isCompleted : {
        type : Boolean,
        default : false
    }
})

module.exports = Task;