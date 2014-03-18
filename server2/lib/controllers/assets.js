var mongoose = require('mongoose'),
    Assets = mongoose.model('Assets'),
    passport = require('passport');
exports.query = function (req, res, next) {
    return Assets.find({}, function (err, assets) {
        if (!err) {
            return res.json(assets);
        } else {
        	console.error('SİKİNTİ', err)
            return res.send(err);
        }
    });
};