"use strict";
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var BlogsSchema = new Schema({
    name: String,
    url: {
        type: String,
        unique: true
    },
    rows: [{
        name: String,
        text: String,
        _asset: {
            name: String,
            file: String,
            type: String
        }
    }],
    description: String,
    tags: [{
        type: String
    }]
});
mongoose.model('Blogs', BlogsSchema);