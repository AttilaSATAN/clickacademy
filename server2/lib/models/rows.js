"use strict";
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    async = require('async');
var RowsSchema = new Schema({
    name: String,
    text: String,
    _asset: {
        name: String,
        file: String,
        type: String
    }
});

mongoose.model('Rows', RowsSchema);