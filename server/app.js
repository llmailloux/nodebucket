/*============================================
; Title:          app.js
; Author:         Laurie Mailloux
; Date:           27 September 2020
; Description:    app 
;===========================================*/

/**
 * Require statements
 */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const Employee = require('./models/employee'); // get the employee 
const EmployeeApi = require('./routes/employee-api'); //import the employee API; sets u routes for the employee 

/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));

/**
 * Variables
 */
const port = 3000; // server port

// TODO: This line will need to be replaced with your actual database connection string
const conn = 'mongodb+srv://nodebucket_user:wVV3bt1Lc95i8HRL@buwebdev-cluster-1.2bwgd.mongodb.net/nodebucket?retryWrites=true&w=majority';

/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
})
.then(() => {
  console.debug(`Connection to the database instance was successful`)
})
.catch(err => {
  console.log(`MongoDB Error: ${err.message}`);
}); // end mongoose connection

/**
 * API(s) go here...
 */
app.use('/api/employees', EmployeeApi); 

/**
   * Create and start server
   */
  http.createServer(app).listen(port, function() {
    console.log(`Application started and listening on port: ${port}`)
  }); // end http create server function
  