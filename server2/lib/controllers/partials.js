var fs = require('fs'),
    path = require('path'),
    config = require('../config/config'),
    partialPath = path.normalize(config.appPath + '/partials');
exports.query = function (req, res, next) {
    fs.readdir(partialPath, function (err, files) {
        if (err) res.json(400, err);
        if (!files.length) return res.send(404);
        res.send({
            partials: files
        });
    });
};