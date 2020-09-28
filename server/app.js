/*============================================
; Title:          app.js
; Author:         Professor R. Krasso
; Modified by:    Laurie Mailloux
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
/**
 * find employee by Id
 */
app.get('/api/employees/:empId', async(req, res) =>{

  try {

    /**
     * Use the mongoose employee model to query MongoDB Atlas by employeeId
     */

    Employee.findOne({'empId': req.params.empId }, function(err, employee){

      /**
       * If there is a database level error, handle by returing a server 500 error
       */

      if (err) {
        console.log(err);
        res.status(500).send({
          'message': 'Internal Server Error!'
        })

      } else {
        /**
         * If there are no database level errors, return the employee object
         */

        console.log(employee);
        res.json(employee);
      }
    })

  } catch (e) {
    /**
     * Catch any potential errors that we didn't prepare for
     */
    console.log(e); 
    res.status(500).send({
      'message': 'Internal Sever Error!',
    })
  }
})

/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function
