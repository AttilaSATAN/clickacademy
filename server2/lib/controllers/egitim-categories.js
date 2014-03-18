var mongoose = require('mongoose'),
    EgitimCategories = mongoose.model('EgitimCategories'),
    passport = require('passport');
exports.query = function (req, res, next) {
    return EgitimCategories.find().populate('_asset').exec(function (err, egitimCategories) {
        if (!err) {
            return res.json(egitimCategories);
        } else {
            return res.send(err);
        }
    });
};
