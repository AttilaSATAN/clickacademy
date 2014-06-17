    'use strict';
    var mongoose = require('mongoose'),
        Academic = mongoose.model('Academic'),
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
        Academic.find()
            .sort('-created')
            .populate('_asset')
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
        if (!req.body._asset || !req.body._asset._id) delete req.body._asset;
        else {
            req.body._asset = mongoose.Types.ObjectId(req.body._asset._id);
        }
        var academic = new Academic(req.body);
        console.log(academic)
        // academic._asset = mongoose.Types.ObjectId(req.body._asset._id) || null;
        academic.save(function (err) {
            if (err) {
                return res.send(400, {
                    message: getErrorMessage(err)
                });
            } else {
                res.jsonp(academic);
            }
        });
    };
    exports.get = function (req, res) {
        res.jsonp(req.academic);
    };
    exports.delete = function (req, res) {
        var academic = req.academic;
        academic.remove(function (err) {
            if (err) {
                return res.send(400, {
                    message: getErrorMessage(err)
                });
            } else {
                res.jsonp(academic);
            }
        });
    };
    exports.update = function (req, res) {
        var egitimler = [];
        if (!req.body._asset._id) delete req.body._asset;
        else {
            // req.body._asset = mongoose.Types.ObjectId(req.body._asset._id);
        }
        if (req.body.egitimler.length) {
            egitimler = _.map(req.body.egitimler, function (egitim) {
                return mongoose.Types.ObjectId(egitim._id);
            });
            console.log(egitimler)
        }
        var academic = req.academic;
        req.body.egitimler = egitimler;
        academic = _.extend(academic, req.body);
        academic.save(function (err) {
            if (err) {
                return res.send(400, {
                    message: getErrorMessage(err)
                });
            } else {
                res.jsonp(academic.populate('_asset')
                    .populate('egitimler'));
            }
        });
    };
    exports.getById = function (req, res, next, academicId) {
        Academic.findById(academicId)
            .populate('_asset')
            .populate('egitimler')
            .exec(function (err, academic) {
                if (err) {
                    return res.send(400, {
                        message: getErrorMessage(err)
                    });
                } else {
                    req.academic = academic;
                    next();
                }
            });
    };