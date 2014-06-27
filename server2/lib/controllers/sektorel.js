    'use strict';
    var mongoose = require('mongoose'),
        Sektorel = mongoose.model('Sektorel'),
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
        Sektorel.find()
            .sort('-created')
            .populate('_asset')
            .exec(function (err, sektorel) {
                if (err) {
                    return res.send(400, {
                        message: getErrorMessage(err)
                    });
                } else {
                    res.jsonp(sektorel);
                }
            });
    };
    exports.create = function (req, res) {
        if (!req.body._asset || !req.body._asset._id) delete req.body._asset;
        else {
            req.body._asset = mongoose.Types.ObjectId(req.body._asset._id);
        }
        var sektorel = new Sektorel(req.body);
        // sektorel._asset = mongoose.Types.ObjectId(req.body._asset._id) || null;
        sektorel.save(function (err) {
            if (err) {
                return res.send(400, {
                    message: getErrorMessage(err)
                });
            } else {
                res.jsonp(sektorel.populate('_asset'));
            }
        });
    };
    exports.get = function (req, res) {
        res.jsonp(req.sektorel);
    };
    exports.delete = function (req, res) {
        var sektorel = req.sektorel;
        sektorel.remove(function (err) {
            if (err) {
                return res.send(400, {
                    message: getErrorMessage(err)
                });
            } else {
                res.jsonp(sektorel);
            }
        });
    };
    exports.update = function (req, res) {
        if (!req.body._asset || !req.body._asset._id) delete req.body._asset;
        else {
            req.body._asset = mongoose.Types.ObjectId(req.body._asset._id);
        }
        var sektorel = req.sektorel;
        sektorel = _.extend(sektorel, req.body);
        sektorel.save(function (err) {
            if (err) {
                return res.send(400, {
                    message: getErrorMessage(err)
                });
            } else {
                res.jsonp(sektorel.populate('_asset'));
            }
        });
    };
    exports.getById = function (req, res, next, sektorelId) {
        Sektorel.findById(sektorelId)
            .populate('_asset')
            .exec(function (err, sektorel) {
                console.log(sektorel)
                if (err) {
                    return res.send(400, {
                        message: getErrorMessage(err)
                    });
                } else {
                    req.sektorel = sektorel;
                    next();
                }
            });
    };
    exports.getByUrl = function (req, res, next, url) {
        Sektorel.findOne({
            url: url
        })
            .populate('_asset')
            .exec(function (err, sektorel) {
                if (err) {
                    return res.send(400, {
                        message: getErrorMessage(err)
                    });
                } else {
                    req.sektorel = sektorel;
                    next();
                }
            });
    };