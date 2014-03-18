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
    .controller('EgitimlerKategoriCtrl', function ($scope, $rootScope, $timeout,
        $stateParams, $interval, EgitimCategoriesResource) {
        $scope.kategoriler = [];
        $timeout(function () {
            $scope.kategoriler = EgitimCategoriesResource.query();
        }, 1500)
    })
    .
controller('EgitimlerKategoriEgitimListesiCtrl', function ($scope,
    EgitimByCategoryResource, $stateParams, $timeout) {
    $scope.egitimler = [];
    $scope.getCollection = function () {
        $scope.egitimler = EgitimByCategoryResource.get({
            categoryUrl: $stateParams.categoryUrl
        });
    }
    $scope.getCollection();
})
    .controller('EgitimCtrl', function ($scope, $stateParams) {})
    .controller('EgitimlerCtrl', function ($scope, $interval, $timeout) {
        $timeout(function () {
            $scope.animationStepOne = true;
        }, 1000);
        $timeout(function () {
            $scope.animationStepTwo = true;
        }, 2000);
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
                var egitim = EgitimResource.get({
                    egitimId: kategoriObj._id || 0
                }, function () {
                    egitim.name = $scope.yeni.egitim.name;
                    egitim.url = $scope.yeni.egitim.url;
                    egitim._categoryId = $scope.yeni.egitim._categoryId;
                    egitim.keywords = $scope.yeni.egitim.keywords;
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
        console.log('YonetimEgitimSayfasiCtrl')
        var getEgitim = function () {
            $scope.egitim = EgitimByUrlResource.get({
                egitimUrl: $stateParams.egitimUrl
            }, function () {
                console.log($scope.egitim)
            });
        };
        getEgitim();
        // $scope.$watch('egitim', function () {
        //     if (to) $timeout.cancel(to);
        //     to = $timeout(function () {
        //         $scope.kaydediliyor = true;
        //         if ($scope.egitim.visual) var egitim =
        //             EgitimResource.get({
        //                 egitimId: $scope.egitim._id || 0
        //             }, function () {
        //                 egitim.visual = egitim.visual || {};
        //                 egitim.visual._id = $scope.egitim.visual
        //                     ._id;
        //                 egitim.name =  $scope.egitim.name;
        //                 egitim.description =  $scope.egitim.description;
        //                 egitim.$save(function () {
        //                     $scope.kaydediliyor = false;
        //                     $scope.kaydedildi = true;
        //                 });
        //             });
        //     }, 3000);
        // }, true);
        $scope.$watch('egitim', function () {
            console.log('SAVEWE')
            if (to) $timeout.cancel(to);
            $scope.kaydediliyor = true;
            to = $timeout(function () {
                console.log('SAVE')
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