"use strict";
var mongoose = require('mongoose'),
    Blogs = mongoose.model('Blogs'),
    Assets = mongoose.model('Assets'),
    Rows = mongoose.model('Rows'),
    passport = require('passport');
exports.query = function (req, res) {
    Blogs.find()
        .exec(function (err, blogs) {
            if (!err) {
                return res.json(blogs);
            } else {
                return res.send(err);
            }
        });
};