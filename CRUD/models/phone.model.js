const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    name :{
        type:String,
        required:'This field is required'
    },
    mobile :{
        type:String,
        required :'This field is required'
    }
});

mongoose.model('Phone',employeeSchema);