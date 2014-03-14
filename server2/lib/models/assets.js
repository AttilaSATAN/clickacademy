"use strict";
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AssetsSchema = new Schema({
	name: String,
	fileName: {type:String, unique: true},
	type: String
});

mongoose.model('Assets', AssetsSchema);