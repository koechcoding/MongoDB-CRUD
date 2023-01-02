const express = require('express');
const cors = require("cors");
const morgan = require('morgan');
const mongoose = require('mongoose');

const app =express(); 
app.use(express.urlencoded({ extended: true}));
app.use(express.json()); //for get json response
app.use(cors());
app.use(morgan("dev"));

app.get('/', (req, res) =>{
    console.log("sadfa")
    res.send("sadfa")
})

//database connection with mongoose(blog create on Run Time)
mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
    console.log("Database connected")
    })
    .catch(err =>{
    console.log(err)
    });

//main route
const homeController = require('./controllers/HomeController')

//using as middleware
app.use('/api/app/v1/blog', homeController);

module.export = app;