var mongoose = require('mongoose'),
    Assets = mongoose.model('Assets'),
    passport = require('passport');
exports.query = function (req, res, next) {
    return Assets.find(function (err, egitimCategories) {
        if (!err) {
            return res.json(egitimCategories);
        } else {
            return res.send(err);
        }
    });
};
