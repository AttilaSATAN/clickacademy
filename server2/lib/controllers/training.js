    'use strict';
    var mongoose = require('mongoose'),
        Training = mongoose.model('Training'),
        _ = require('lodash'),
        passport = require('passport');
    var getErrorMessage = function (err) {
        var message = '';
        console.error(err)
        if (err.code) {
            switch (err.code) {
            case 11000:
            case 11001:
                message = 'Bir sorun oluştu';
                break;
            default:
                message = 'Bir sorun oluştu.';
            }
        } else {
            for (var errName in err.errors) {
                if (err.errors[errName].message) message = err.errors[errName].message;
            }
        }
        return message;
    };
    exports.query = function (req, res) {
        Training.find()
            .sort('-created')
            .exec(function (err, assets) {
                if (err) {
                    return res.send(400, {
                        message: getErrorMessage(err)
                    });
                } else {
                    res.jsonp(assets);
                }
            });
    };
    exports.create = function (req, res) {
        var training = new Training(req.body);
        
        training.save(function (err) {
            if (err) {
                return res.send(400, {
                    message: getErrorMessage(err)
                });
            } else {
                res.jsonp(training);
            }
        });
    };
    exports.get = function (req, res) {
        res.jsonp(req.training);
    };
    exports.delete = function (req, res) {
        var training = req.training;
        training.remove(function (err) {
            if (err) {
                return res.send(400, {
                    message: getErrorMessage(err)
                });
            } else {
                res.jsonp(training);
            }
        });
    };
    exports.update = function (req, res) {
        var training = req.training;
        training = _.extend(training, req.body);
        training.save(function (err) {
            if (err) {
                return res.send(400, {
                    message: getErrorMessage(err)
                });
            } else {
                res.jsonp(training);
            }
        });
    };
    exports.getById = function (req, res, next, trainingId) {
        Training.findById(trainingId)
            .exec(function (err, training) {
                if (err) {
                    return res.send(400, {
                        message: getErrorMessage(err)
                    });
                } else {
                    req.training = training;
                    next();
                }
            });
    };
    exports.getByUrl = function (req, res, next, url) {
        Training.findOne({
            url: url
        })
            .exec(function (err, training) {
                if (err) {
                    return res.send(400, {
                        message: getErrorMessage(err)
                    });
                } else {
                    req.training = training;
                    next();
                }
            });
    };
    exports.getByEgitimName = function (req, res, next, egitimName) {
        Training.findOne({
            name: egitimName,
            closed: false
        })
            .exec(function (err, training) {
                if (err) {
                    return res.send(400, {
                        message: getErrorMessage(err)
                    });
                } else {
                    res.jsonp(training);
                }
            });
    };