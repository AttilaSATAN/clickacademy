var mongoose = require('mongoose'),
    Assets = mongoose.model('Assets'),
    passport = require('passport'),
    fs = require('fs'),
    path = require('path'),
    config = require('../../lib/config/config');


exports.file = function (req, res, next) {
    if (typeof req.files.gorsel.path === 'undefined') return res.send([new Error(
        'Dosya alınamadı.')]);
    //TODO Burası pipe olarak değiştirilecek.
    fs.readFile(req.files.gorsel.path, function (err, data) {
        var assetFileName = req.body.fileName || false;
        var assetName = req.body.name || false;
        if (err) return res.send('ERROR: args: ', arguments);
        if (!assetFileName || !assetName) {
            res.end([new Error('Dosya adı girilmedi.')]);
        } else {
            console.log(req.files.gorsel)
            var newFileName = assetFileName + '.' + req.files.gorsel.type.split(
                '/')[1];
            // TODO Login meseleleri falan
            var asset = {
                file: newFileName,
                name: assetName,
                type: req.files.gorsel.type
            };
            Assets.findOne({
                file: newFileName
            }, function (err, persistantAsset) {
                var newAsset;
                if (err) {
                    console.error(err);
                    return res.send('500', arguments);
                }
                if (!persistantAsset) {
                    newAsset = new Assets(asset);
                    console.log("newAsset", newAsset)
                } else {
                    newAsset = persistantAsset;
                    console.log("persistantAsset", persistantAsset)
                }
                fs.readFile(req.files.gorsel.path, function (err, data) {
                    fs.writeFile(path.normalize(config.appPath +
                            '/assets/' + newFileName), data,
                        function (err) {
                            newAsset.save(function (err, row) {
                                console.log(err);
                                if (err) return res.send('500',
                                    arguments);
                                res.send(arguments);
                            });
                        });
                });
            });
        }
    });
};