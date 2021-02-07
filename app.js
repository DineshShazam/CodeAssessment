const express = require('express');
require('dotenv').config({path:'./config/config.env'}); 
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser'); 
app.use(bodyParser.json());
const routes = require('./routes/index');
const { connectToServer } = require('./db_driver/dbDriver');

if(process.env.NODE_ENV == 'development') {
    app.use(cors({
        origin:process.env.CLIENT_URL
    }))
}

connectToServer((err,client) => {

    if(err) {
        console.log('Database Connection error');
    }

    app.use(bodyParser.json());

    app.use('/',routes);

    app.get('*',(req,res) => {
        res.status(500).json({
            message: 'Invalid URL Request',
          });
    });

    // page not found error
    app.use((req,res) => {
        res.status(404).json({
            success: false,
            msg: "Invalid API Request"
        })
    })

});


module.exports = app;