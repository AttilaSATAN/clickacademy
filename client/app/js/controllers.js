/*global angular */
/*jshint devel:true, browser:true */
angular.module('lupusshow.controllers', [])
    .controller('HomeCtrl', function ($scope, $timeout) {
        "use strict";
        // $scope.videoIntro = {
        //     type: 'video',
        //     srcs: [{
        //         src: 'assets/click_web_anim.mp4',
        //         type: 'video/mp4'
        //     }, {
        //         src: 'video/click_web_anim.webm',
        //         type: 'video/webm'
        //     }]
        // };
        $scope.homeSlides = [{
            type: 'image',
            src: 'img/after_effects.jpg'
        }, {
            type: 'image',
            src: 'img/grafik_tasarim.jpg'
        }, {
            type: 'image',
            src: 'img/photoshop.jpg'
        }, {
            type: 'image',
            src: 'img/web_tasarim.jpg'
        }, {
            type: 'image',
            src: 'img/autocad.jpg'
        }, {
            type: 'image',
            src: 'img/java.jpg'
        }, {
            type: 'image',
            src: 'img/seo.jpg'
        }];
    })
    .controller('BizCtrl', function ($scope, $interval, $timeout) {})
    .controller('KategorilerCtrl', function ($scope) {})
    .controller('KategoriListesiCtrl', function ($scope, $rootScope, $timeout,
        $stateParams, $interval, EgitimCategoriesResource) {
        $rootScope.kategori = $rootScope.kategori || {};
        $timeout(function () {
            $scope.kategoriler = EgitimCategoriesResource.query();
        }, 1500);
    })
    .controller('KategoriEgitimleriCtrl', function ($scope,
        EgitimByCategoryResource, $stateParams, $timeout, $rootScope) {
        $rootScope.kategori = $rootScope.kategori || {};
        $scope.egitimler = [];
        $scope.getCollection = function () {
            $scope.egitimler = EgitimByCategoryResource.get({
                categoryUrl: $stateParams.categoryUrl
            });
        };
        $timeout(function () {
            $scope.getCollection();
        }, 500);
    })
    .controller('EgitimCtrl', function ($scope, $stateParams) {})
    .controller('EgitimlerCtrl', function ($scope, $interval, $timeout) {
        var totalStep = 5,
            currentStep = 0;
        $scope.buttons = [{
            buttonText: "Uzmanlık Eğitimleri",
            sref: 'egitimler.kategori.liste'
        }, {
            buttonText: "Akademik Eğitimler",
            sref: 'egitimler.mesleki'
        }, {
            buttonText: "Sektörel Eğitimler",
            sref: 'egitimler.sektorel'
        }];
        $scope.animationStep = [];
        var doStep = function () {
            $scope.animationStep[currentStep] = true;
            if (currentStep < totalStep) {
                currentStep++;
                step();
            }
        };
        var step = function () {
            $timeout(function () {
                doStep();
            }, 500);
        };
        step();
    })
    .controller('YonetimCtrl', ['$scope',
        function ($scope) {}
    ])
    .controller('YonetimStatesCtrl', function ($scope, StateResource) {
        $scope.states = StateResource.query(function () {
            console.log(arguments);
        });
        $scope.create = function () {};
        //$scope.update = function (){};
    })
    .controller('YonetimTemplatesCtrl', ['$scope', 'PartialsResource',
        'slugify', 'TemplateResource',
        function ($scope, PartialsResource, slugify, TemplateResource) {
            $scope.data = PartialsResource.get(function () {
                console.log(arguments);
            });
            $scope.state = {};
            $scope.$watch('state.pageName', function () {
                $scope.state.url = slugify($scope.state.pageName);
            });
            $scope.kaydet = function () {};
            //$scope.partials = PartialsResource.query();
        }
    ])
    .controller('YonetimEgitimlerCtrl', function ($scope, EgitimResource,
        EgitimlerResource, EgitimCategoriesResource, slugify) {
        $scope.yeni = {};
        $scope.noop = {
            keywords: [],
            name: null,
            url: null,
            _categoryId: null
        };
        $scope.yeni.egitim = angular.copy($scope.noop);
        $scope.egitimCategories = EgitimCategoriesResource.query();
        $scope.crud = {
            remove: function (_id) {
                EgitimResource.remove({
                    egitimId: _id
                }, function () {
                    getCollection();
                });
            },
            save: function (kategoriObj) {
                console.log({
                    egitimId: kategoriObj._id || 0
                });
                var egitim = EgitimResource.get({
                    egitimId: kategoriObj._id || 0
                }, function () {
                    egitim.name = $scope.yeni.egitim.name;
                    egitim.url = $scope.yeni.egitim.url;
                    egitim._categoryId = $scope.yeni.egitim._categoryId;
                    egitim.keywords = $scope.yeni.egitim.keywords;
                    egitim.shortTag = $scope.yeni.egitim.shortTag;
                    egitim.$save(function () {
                        $scope.yeni.egitim = angular.copy($scope.noop);
                        getCollection();
                    });
                });
            }
        };
        $scope.$watch('yeni.egitim.name', function () {
            if (typeof $scope.yeni.egitim !== 'undefined') $scope.yeni.egitim
                .url = slugify($scope.yeni.egitim.name);
        });
        $scope.duzenle = function (egitimObj) {
            $scope.yeni.egitim = angular.copy(egitimObj);
        };
        var getCollection = function () {
            $scope.egitimler = EgitimlerResource.query();
        };
        getCollection();
    })
    .controller('YonetimEgitimSayfasiCtrl', function ($scope, EgitimResource,
        EgitimlerResource, EgitimByUrlResource, $stateParams, $timeout) {
        $scope.kaydediliyor = false;
        $scope.kaydedildi = false;
        $scope.egitim = {};
        var to = null;
        var getEgitim = function () {
            $scope.egitim = EgitimByUrlResource.get({
                egitimUrl: $stateParams.egitimUrl
            }, function () {
                console.log($scope.egitim)
            });
        };
        getEgitim();
        $scope.$watch('egitim', function () {
            if (to) $timeout.cancel(to);
            $scope.kaydediliyor = true;
            to = $timeout(function () {
                var egitim = EgitimResource.get({
                    egitimId: $scope.egitim._id || 0
                }, function () {
                    if ($scope.egitim._asset) {
                        egitim._asset = egitim._asset || {};
                        egitim._asset._id = $scope.egitim._asset
                            ._id || null;
                    }
                    egitim.name = $scope.egitim.name;
                    egitim.description = $scope.egitim.description;
                    egitim.$save(function (gitimServer) {
                        $scope.kaydediliyor = false;
                        $scope.kaydedildi = true;
                    });
                });
            }, 3000);
        }, true);
    })
    .controller('IletisimCtrl', function ($scope) {
        $scope.map = {
            center: {
                latitude: 39.991162,
                longitude: 32.77
            },
            zoom: 14,
            marker: {
                coords: {
                    latitude: 39.991162,
                    longitude: 32.738901
                },
                options: {
                    draggable: false,
                },
                icon: 'img/hz_icon_marker.png'
            }
        };
    })
    .controller('YonetimBlogCtrl', function ($scope, BlogsResource,
        BlogResource, BlogByUrlResource, $stateParams, $timeout) {
        $scope.kaydediliyor = false;
        $scope.kaydedildi = false;
        $scope.blog = {};
        var to = null;
        var getBlog = function () {
            $scope.blog = BlogByUrlResource.get({
                blogUrl: $stateParams.blogUrl
            }, function () {
                console.log($scope.blog)
            });
        };
        getBlog();
        $scope.newRow = function () {
            $scope.blog._rows = $scope.blog._rows || [];
            $scope.blog._rows.push({
                name: 'Boş Başlık',
                text: 'boş metin'
            });
        };
        $scope.kaydet = function () {
            $scope.kaydediliyor = true;
            var blog = BlogResource.get({
                blogId: $scope.blog._id || 0
            }, function () {
                blog._rows = $scope.blog._rows;
                blog.description = $scope.blog.description;
                console.log("giden blog", blog._rows[0])
                blog.$save(function (gitimServer) {
                    console.log('birşeyler kaydedilmiş olmalı')
                    $scope.kaydediliyor = false;
                    $scope.kaydedildi = true;
                    getBlog();
                });
            });
        };
    })
    .controller('YazılımEgitimBulutuCtrl', function ($scope) {
        $scope.egitimler = [{
            name: 'CS'
        }, {
            name: 'CSS'
        }, {
            name: 'JS'
        }, {
            name: 'ASP'
        }, {
            name: 'C++'
        }, {
            name: 'PY'
        }, {
            name: 'RUBY'
        }, {
            name: 'ALG'
        }, {
            name: 'CRYP'
        }];
    })
    .controller('YonetimBlogsCtrl', function ($scope, BlogsResource,
        BlogResource, slugify) {
        $scope.yeni = {};
        $scope.noop = {
            tags: [],
            name: null,
            url: null,
        };
        $scope.yeni.blog = angular.copy($scope.noop);
        $scope.crud = {
            remove: function (_id) {
                BlogResource.remove({
                    blogId: _id
                }, function () {
                    getCollection();
                });
            },
            save: function (blogObj) {
                console.log({
                    blogId: blogObj._id || 0
                })
                var blog = BlogResource.get({
                    blogId: blogObj._id || 0
                }, function () {
                    console.log(blog)
                    blog.name = $scope.yeni.blog.name;
                    blog.url = $scope.yeni.blog.url;
                    blog.tags = $scope.yeni.blog.tags;
                    blog.$save(function () {
                        $scope.yeni.blog = angular.copy($scope.noop);
                        getCollection();
                    });
                });
            }
        };
        $scope.$watch('yeni.blog.name', function () {
            console.log($scope.yeni.blog)
            if (typeof $scope.yeni.blog !== 'undefined') $scope.yeni.blog
                .url = slugify($scope.yeni.blog.name);
        });
        $scope.duzenle = function (blogObj) {
            $scope.yeni.blog = angular.copy(blogObj);
        };
        var getCollection = function () {
            $scope.blogs = BlogsResource.query();
        };
        getCollection();
    })
    .controller('YonetimEgitimKategorileriCtrl', function ($scope,
        EgitimCategoriesResource, EgitimCategoryResource, slugify) {
        $scope.yeniKategori = {};
        $scope.crud = {
            remove: function (_id) {
                EgitimCategoryResource.remove({
                    categoryId: _id
                }, function () {
                    getCollection();
                });
            },
            create: function (kategoriObj) {
                var kategori = EgitimCategoryResource.get({
                    categoryId: kategoriObj._id || 0
                }, function () {
                    kategori.name = $scope.yeniKategori.name;
                    kategori.url = $scope.yeniKategori.url;
                    kategori.subHeader = $scope.yeniKategori.subHeader;
                    kategori.description = $scope.yeniKategori.description;
                    kategori._asset = kategori._asset || {};
                    kategori._asset._id = $scope.yeniKategori._asset._id;
                    kategori.$save(function () {
                        getCollection();
                    });
                });
            }
        };
        $scope.$watch('yeniKategori.name', function () {
            if (typeof $scope.yeniKategori !== 'undefined') $scope.yeniKategori
                .url = slugify($scope.yeniKategori.name);
        });
        $scope.duzenle = function (kategoriObj) {
            $scope.yeniKategori = angular.copy(kategoriObj);
        };
        var getCollection = function () {
            $scope.egitimCategories = EgitimCategoriesResource.query();
        };
        getCollection();
    });