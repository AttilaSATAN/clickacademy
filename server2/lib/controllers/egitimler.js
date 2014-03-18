var mongoose = require('mongoose'),
    Egitimler = mongoose.model('Egitimler'),
    passport = require('passport');
exports.query = function (req, res, next) {
    return Egitimler.find()
        .populate('visual')
        .exec(function (err, egitimler) {
            if (!err) {
                return res.json(egitimler);
            } else {
                return res.send(err);
            }
        });
};