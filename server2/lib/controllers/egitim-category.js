var mongoose = require('mongoose'),
    EgitimCategories = mongoose.model('EgitimCategories'),
    passport = require('passport');
exports.save = function (req, res, next) {
    console.log(req.body);
    if (!req.body._id) {
        var category = new EgitimCategories(req.body);
        category.save(function (err, then) {
            if (err) return res.json(err);
            res.json(then);
        });
    } else {
        EgitimCategories.findById(req.body._id).populate('_asset').exec(function (err, category) {
            if (err) return res.send(err);
            console.log(req.body.name)
            console.log(category)
            category.name = req.body.name;
            category.url = req.body.url;
            category.subHeader = req.body.subHeader;
            category.description = req.body.description;
            if (req.body._asset) {
                console.log(req.body._asset)
                category._asset = mongoose.Types.ObjectId(req.body._asset._id);
                //egitim.visual._id = req.body.visual;
            }
            category.save(function (err, then) {
                if (err) return res.json(err);
                res.json(then);
            });
        });
    }
};
exports.get = function (req, res, next) {
    var categoryId = req.params.categoryId;
    EgitimCategories.findById(categoryId).populate('_asset').exec(function (err, egitimCategory) {
        console.log(egitimCategory)
        if (!err) {
            return res.json(egitimCategory);
        } else {
            res.json(egitimCategory);
        }
    });
};
exports.delete = function (req, res, next) {
    var categoryId = req.params.categoryId;
    return EgitimCategories.findById(categoryId)
        .remove(function (err, egitimCategories) {
            if (!err) {
                return res.json(egitimCategories);
            } else {
                return res.send(err);
            }
        });
};