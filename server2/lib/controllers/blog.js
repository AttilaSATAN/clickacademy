var mongoose = require('mongoose'),
    Blogs = mongoose.model('Blogs'),
    Rows = mongoose.model('Rows'),
    Assets = mongoose.model('Assets'),
    passport = require('passport'),
    fs = require('fs');
exports.save = function (req, res, next) {
    //var updateBlogs = function () {
    var request = {
        name: req.body.name,
        url: req.body.url,
        description: req.body.description,
    };
    if (req.body.rows && req.body.rows.length) {
        request.rows = [];
        req.body.rows.forEach(function (row, ri) {
            request.rows.push(row);
        });
    }
    if (req.body.tags) {
        request.tags = [];
        req.body.tags.forEach(function (tag) {
            request.tags.push(tag);
        });
    }
    console.log('REQ', request)
    if (!req.body._id) {
        var blog = new Blogs(request);
        blog.save(function (err, newBlog) {
            console.log('Yeni BLOG', newBlog);
            if (!err) {
                return res.json(newBlog);
            } else {
                res.json(err);
            }
        });
    } else {
        console.log('req.body._id', req.body._id);
        Blogs.findById(req.body._id, function (err, theBlog) {
            console.log('Queried', theBlog)
            theBlog.name = request.name;
            theBlog.url = request.url;
            theBlog.description = request.description;
            if (request.rows && request.rows.length) theBlog.rows = request
                .rows;
            if (req.body.tags) theBlog.tags = request.tags;
            theBlog.save(function (err, modBlog) {
                console.log('BİSEYLER YAZILDI MI', modBlog)
                if (!err) {
                    return res.json(modBlog);
                } else {
                    res.json(modBlog);
                }
            })
        })
    }
};
exports.get = function (req, res, next) {
    var blogId = req.params.blogId;
    Blogs.findById(blogId)
        .exec(function (err, blog) {
            if (!err) {
                return res.json(blog);
            } else {
                res.json(err);
            }
        });
};
// exports.byTag = function (req, res, next) {
//     var categoryUrl = req.params.categoryUrl;
//     if (categoryUrl) {
//         return EgitimCategories.findOne({
//             url: categoryUrl
//         })
//             .populate('_asset')
//             .exec(function (err, category) {
//                 if (err) return res.json(err);
//                 if (category._id) {
//                     Egitimler.find({})
//                         .populate('_categoryId')
//                         .find({
//                             _categoryId: category._id
//                         })
//                         .populate('_asset')
//                         .exec(function (err, egitim) {
//                             console.log(category._id, egitim)
//                             if (!err) {
//                                 return res.json(egitim);
//                             } else {
//                                 res.json(err);
//                             }
//                         });
//                 } else {
//                     res.json(err || 'sikinti');
//                 }
//             });
//     }
//     res.json(req.params)
// };
// exports.visual = function (req, res, next) {
//     console.log('REQ', JSON.stringify(req.files));
//     // if (typeof req.files.gorsel.path === 'undefined')
//     //     return res.send([new Error('Dosya alınamadı.')]);
//     // TODO Burası pipe olarak değiştirilecek.
//     // fs.readFile(req.files.gorsel.path, function (err, data) {
//     //     //var imageName = req.files.gorsel.name;
//     //     if (err)
//     //         return res.send(arguments);
//     //     if (!imageName) {
//     //         res.end([new Error('Dosya alınamadı.')]);
//     //     } else {
//     //         var newName = tools.slugify(imageName) + '.jpg';
//     //         // TODO Login meseleleri falan
//     //         //var newPath = path.join(__dirname, 'uploads/52f7f99796bfd7f42f168d39/') + tools.slugify(newName) + '.jpg';
//     //         var newGorsel = models.Gorseller({
//     //             file: '_' + newName
//     //         });
//     //         newGorsel.save(function (err, row) {
//     //             if (err)
//     //                 return res.send(arguments);
//     //             newName = row._id + newName;
//     //             var newPath = 'C:\\Dev\\Projects\\gayrimenkul\\client\\app\\img\\' + newName;
//     //             fs.writeFile(newPath, data, function (err) {
//     //                 newGorsel.file = newName;
//     //                 newGorsel.save(function () {
//     //                     res.send(arguments);
//     //                 });
//     //             });
//     //         });
//     //     }
//     // });
// };
// exports.get = function (req, res, next) {
//     var egitimId = req.params.egitimId;
//     Egitimler.findById(egitimId)
//         .populate('_asset')
//         .exec(function (err, egitim) {
//             if (!err) {
//                 return res.json(egitim);
//             } else {
//                 res.json(egitim);
//             }
//         });
// };
exports.byUrl = function (req, res, next) {
    var blogUrl = req.params.blogUrl;
    console.log("blogUrl", blogUrl)
    Blogs.findOne({
        url: blogUrl
    })
        .populate('_rows')
        .populate('_rows._assets')
        .exec(function (err, blog) {
            console.log(err, blog)
            if (!err) {
                return res.json(blog);
            } else {
                res.json(err);
            }
        });
};
// exports.delete = function (req, res, next) {
//     var egitimId = req.params.egitimId;
//     console.log(egitimId);
//     return Egitimler.findById(egitimId)
//         .remove(function (err, egitim) {
//             if (!err) {
//                 return res.json(egitim);
//             } else {
//                 return res.send(err);
//             }
//         });
// };