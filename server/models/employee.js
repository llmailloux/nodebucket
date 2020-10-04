/*============================================
; Title:          employees.js
; Author:         Professor R. Krasso
; Modified by:    Laurie Mailloux
; Date:           27 September 2020
; Description:    Creates an employee
;===========================================*/



const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const item = require('./item');

/**
 * employee schema, sprint 1
 */

 let employeeSchema = new Schema({
     empId: { type: String, unique: true, dropDups: true },
     firstName: { type: String },
     lastName: { type: String },
     todo: [item],
     done: [item]
 }, { collection: 'employees'});

 module.exports = mongoose.model('Employee', employeeSchema);