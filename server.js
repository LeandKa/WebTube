require("dotenv").config();


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const app = express();

//Routes
const admin = require('./routes/adminRoutes');
const auth = require('./routes/authRoutes');
const query = require('./routes/queryRoutes');

app.use('/img',express.static('img'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());


// Pass the global passport object into the configuration function
require('./util/passportConfig')(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());

app.use(admin);
app.use(auth);
app.use(query);


const Port = '3000';

app.listen(Port,()=>{
    console.log('OK');
})

module.exports = app