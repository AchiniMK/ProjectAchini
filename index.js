const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const connectDb = require('./db.js');
require('dotenv').config();
const PORT = process.env.SERVER_PORT || 3000;

//===============================
const userRoute = require('./route/UserRoute.js')
const employeeRoute = require('./route/EmployeeRoute.js')
//===============================

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// parse application/json
app.use(bodyParser.json())

app.use('/api/v1/users', userRoute);
app.use('/api/v1/employees', employeeRoute); //http://localhost:3000/api/v1/employees/create-employee(POST)

  //===================================

connectDb()
    .then(()=>{
        console.log('db connection succeeded.');
        app.listen(PORT,
            ()=>console.log(`Server running on port: http://localhost:${PORT}`));
    })
    .catch(err =>console.log(err));



 