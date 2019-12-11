const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/crud", { newUrlParser: true}, (err) =>{
    if(!err) {console.log('Mongodb connection succeeded')}
    else{console.log('Error in DB connection:'+ err)}
});

require('./phone.model');