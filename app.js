const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:5000"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
//connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true },() => {
    return console.log('connected');
});

//listen
app.listen(5002,() => console.log(`Server running on port 5002`));

//Middlewares
/*
app.use.(auth)
app.use('/about',() => {
    console.log('middleare...');
})
*/
//home route
app.get('/',(req,res) => {
    res.send('we are home');
});

//Posts Routes
const postRoute = require('./routes/posts');

app.use('/posts',postRoute);

//User Routes
const userRoute = require('./routes/user');

app.use('/user',userRoute);

