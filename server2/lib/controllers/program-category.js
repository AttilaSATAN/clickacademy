var mongoose = require('mongoose'),
    ProgramCategory = mongoose.model('ProgramCategory'),
    passport = require('passport');
exports.query = function (req, res, next) {
    return ProgramCategory.find(function (err, programCategory) {
        if (!err) {
            return res.json(programCategory);
        } else {
            return res.send(err);
        }
    });
};