"use strict";
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var AssetsSchema = new Schema({
    name: String,
    file: {
        type: String,
        unique: true
    },
    type: String,
    date: { type: Date, default: Date.now },
});
var Assets = mongoose.model('Assets', AssetsSchema);