const express = require('express');
require('dotenv').config({path:'./config/config.env'}); 
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser'); 
app.use(bodyParser.json());
const handlebars = require('express-handlebars');
const userRouter = require('./routes/userRoute');
const adminRouter = require('./routes/adminRoute');
const { connectToServer } = require('./db_driver/dbDriver');

if(process.env.NODE_ENV == 'development') {
    app.use(cors({
        origin:process.env.CLIENT_URL
    }))
}

app.set('view engine', 'hbs');

app.engine('hbs', handlebars({
  layoutsDir: './view_template/layout',
  extname: 'hbs',
}));

connectToServer((err,client) => {

    if(err) {
        return new Error('Databse Connection Error');
    }

    app.use(bodyParser.json());

    app.use('/user',userRouter);
    app.use('/admin',adminRouter);

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