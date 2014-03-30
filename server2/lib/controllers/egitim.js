var mongoose = require('mongoose'),
    Egitimler = mongoose.model('Egitimler'),
    EgitimCategories = mongoose.model('EgitimCategories'),
    Assets = mongoose.model('Assets'),
    passport = require('passport'),
    fs = require('fs');
exports.save = function (req, res, next) {
    if (!req.body._id) {
        var egitim = new Egitimler(req.body);
        egitim.save(function (err, then) {
            if (err) return res.json(err);
            res.json(then);
        });
    } else {
        Egitimler.findById(req.body._id)
            .populate('_asset')
            .exec(function (err, egitim) {
                if (err) return res.send(err);
                egitim.name = req.body.name;
                egitim.url = req.body.url;
                egitim._categoryId = req.body._categoryId;
                egitim.keywords = req.body.keywords;
                egitim.description = req.body.description;
                egitim.shortTag = req.body.shortTag;
                if (req.body._asset) {
                    egitim._asset = mongoose.Types.ObjectId(req.body._asset
                        ._id);
                }
                console.log("egitim._asset", egitim._asset)
                egitim.save(function (err, then) {
                    if (err) return res.json(err);
                    res.json(then);
                });
            });
    }
};
exports.byCategory = function (req, res, next) {
    var categoryUrl = req.params.categoryUrl;
    if (categoryUrl) {
        return EgitimCategories.findOne({
            url: categoryUrl
        })
            .exec(function (err, category) {
                if (err) return res.json(err);
                if (category._id) {
                    Egitimler.find({})
                        .populate('_categoryId')
                        .find({
                            _categoryId: category._id
                        })
                        .populate('_asset')
                        .exec(function (err, egitim) {
                            
                            if (!err) {
                                return res.json(egitim);
                            } else {
                                res.json(err);
                            }
                        });
                } else {
                    res.json(err || 'sikinti');
                }
            });
    }
    res.json(req.params)
};
exports.visual = function (req, res, next) {
    console.log('REQ', JSON.stringify(req.files));
    // if (typeof req.files.gorsel.path === 'undefined')
    //     return res.send([new Error('Dosya alınamadı.')]);
    // TODO Burası pipe olarak değiştirilecek.
    // fs.readFile(req.files.gorsel.path, function (err, data) {
    //     //var imageName = req.files.gorsel.name;
    //     if (err)
    //         return res.send(arguments);
    //     if (!imageName) {
    //         res.end([new Error('Dosya alınamadı.')]);
    //     } else {
    //         var newName = tools.slugify(imageName) + '.jpg';
    //         // TODO Login meseleleri falan
    //         //var newPath = path.join(__dirname, 'uploads/52f7f99796bfd7f42f168d39/') + tools.slugify(newName) + '.jpg';
    //         var newGorsel = models.Gorseller({
    //             file: '_' + newName
    //         });
    //         newGorsel.save(function (err, row) {
    //             if (err)
    //                 return res.send(arguments);
    //             newName = row._id + newName;
    //             var newPath = 'C:\\Dev\\Projects\\gayrimenkul\\client\\app\\img\\' + newName;
    //             fs.writeFile(newPath, data, function (err) {
    //                 newGorsel.file = newName;
    //                 newGorsel.save(function () {
    //                     res.send(arguments);
    //                 });
    //             });
    //         });
    //     }
    // });
};
exports.get = function (req, res, next) {
    var egitimId = req.params.egitimId;
    Egitimler.findById(egitimId)
        .populate('_asset')
        .exec(function (err, egitim) {
            if (!err) {
                return res.json(egitim);
            } else {
                res.json(egitim);
            }
        });
};
exports.byUrl = function (req, res, next) {
    var egitimUrl = req.params.egitimUrl;
    Egitimler.findOne({
        url: egitimUrl
    })
        .populate('_asset')
        .exec(function (err, egitim) {
            if (!err) {
                return res.json(egitim);
            } else {
                res.json(egitim);
            }
        });
};
exports.delete = function (req, res, next) {
    var egitimId = req.params.egitimId;
    console.log(egitimId);
    return Egitimler.findById(egitimId)
        .remove(function (err, egitim) {
            if (!err) {
                return res.json(egitim);
            } else {
                return res.send(err);
            }
        });
};