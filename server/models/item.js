/*============================================
; Title:          item.js
; Author:         Professor R. Krasso
; Modified by:    Laurie Mailloux
; Date:           05 October 2020
; Description:    home page
;===========================================*/


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let itemSchema = new Schema({
    text: { type: String }
});

module.exports = itemSchema;