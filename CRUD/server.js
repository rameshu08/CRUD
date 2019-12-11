require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

var app  = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const employeeController = require('./controllers/Controller');

app.set('views', path.join(__dirname,'/views/'));
app.engine('hbs',exphbs({ extname:'hbs', defaultLayout:'mainLayout', layoytDir:__dirname + '/views/layouts/'}));
app.set('view engine','hbs');

app.listen(3006,() => {
    console.log('Server running on port 3006');
});

app.use('/',employeeController);

