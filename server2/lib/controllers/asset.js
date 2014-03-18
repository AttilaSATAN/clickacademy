var mongoose = require('mongoose'),
    Assets = mongoose.model('Assets'),
    passport = require('passport'),
    fs = require('fs'),
    path = require('path'),
    config = require('../../lib/config/config');
exports.file = function (req, res, next) {
    var exampleReqFileObject = {
        "gorsel": {
            "fieldName": "gorsel",
            "originalFilename": "click_web_anim.webm",
            "path": "C:\\Users\\Attila\\AppData\\Local\\Temp\\8276-om4laz.webm",
            "headers": {
                "content-disposition": "form-data; name=\"gorsel\"; filename=\"click_web_anim.webm\"",
                "content-type": "video/webm"
            },
            "ws": {
                "_writableState": {
                    "highWaterMark": 16384,
                    "objectMode": false,
                    "needDrain": false,
                    "ending": true,
                    "ended": true,
                    "finished": true,
                    "decodeStrings": true,
                    "defaultEncoding": "utf8",
                    "length": 0,
                    "writing": false,
                    "sync": false,
                    "bufferProcessing": false,
                    "writecb": null,
                    "writelen": 0,
                    "buffer": []
                },
                "writable": true,
                "domain": null,
                "_events": {
                    "error": [null],
                    "close": [null]
                },
                "_maxListeners": 10,
                "path": "C:\\Users\\Attila\\AppData\\Local\\Temp\\8276-om4laz.webm",
                "fd": null,
                "flags": "w",
                "mode": 438,
                "bytesWritten": 1310490,
                "closed": true
            },
            "size": 1310490,
            "name": "click_web_anim.webm",
            "type": "video/webm"
        }
    };
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
            var newAsset = new Assets(asset);
            fs.readFile(req.files.gorsel.path, function (err, data) {
                fs.writeFile(path.normalize(config.appPath + '/assets/' +
                    newFileName), data, function (err) {
                    console.log(err);
                    console.log('LALALA');
                    newAsset.save(function (err, row) {
                        console.log(err);
                        if (err) return res.send('500',
                            arguments);
                        res.send(arguments);
                    });
                });
            });
        }
    });
};