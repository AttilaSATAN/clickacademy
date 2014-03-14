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
    EgitimByCategoryResource, $stateParams) {
    $scope.egitimler = [];
    $scope.getCollection = function () {
        $scope.egitimler = EgitimByCategoryResource.get({
            categoryUrl: $stateParams.categoryUrl
        });
    }
    $scope.getCollection();
})
    .controller('EgitimCtrl', function ($scope, $stateParams) {
        console.log("$stateParams");
        $scope.egitim = {
            "_id": "kurs4",
            "name": "C++ Eğitimi",
            "link": "c++-egitimi",
            "_categoryId": "1357ab",
            "description": "C++",
            "visual": {
                "type": "video",
                "srcs": [{
                    "src": ".avi"
                }, {
                    "src": ".webm"
                }]
            },
            "text": "1980'lerin başında Bjarne Stroustroup tarafından geliştirilen C'yi kapsayan ve nesne yönelimli programlamaya (Object Oriented Programming) olanak sağlayan sınıf tanımlarıyla ilerleten yaygın olarak kullanılan programlama dilidir. Genelde üniversitelerin bilgisayar, elektrik-elektronik, endüstri mühendisliği ve buna benzer bölümlerinde eğitim alan öğrencilerinin talep ettiği bir kurstur.\
C++ Kursuna Katılmak İçin Önkoşullar Nelerdir?\
Algoritma bilgisine sahip olmak gereklidir.",
            "dersler": ["C++ Tarihçesi", "API Tanıtımı", "Dizin silmek",
                "İlk programın yazılıp derlenmesi ve çalıştırılması",
                "C++ Dil Özellikleri"
            ],
            "keywords": ["c++", "programlama", "masa üstü"],
        };
        $scope.bloglar = ['C++ İle Object Orianted Programlama',
            'Header Dosyaları', 'QT'
        ];
        $scope.mesleki = ['Programlama Kariyer Eğitimi'];
    })
    .controller('EgitimlerCtrl', function ($scope, $interval, $timeout) {
        $scope.egitimler = [];
        var egitimler = [{
            header: 'Temel Bilgisayar',
            text: 'Photoshop bir grafik düzenleme programıdır. Grafik düzenleme yazılımları (Photo Editing Software)',
            buttonText: 'Ayrıntılar',
            kategoriLink: {
                kategoriLink: 'temel-bilgisayar-egitimi'
            }
        }, {
            header: 'Bilişim Teknolojileri',
            text: 'Bundan dolayı içerdiği çizim araçları, kalem ve fırçadan çok, kesme kopyalama ve silme üzerine dayalıdır. Bu tip programlar kabaca örnek vermek gerekirse, iki resmin montajlanmasından var ',
            buttonText: 'Ayrıntılar',
            kategoriLink: {
                kategoriLink: 'bilisim-teknolojileri'
            }
        }, {
            header: 'Görsel Bilişim',
            text: 'Photoshop yeni bir resim oluşturmaktan bir çok alanda kullanılırlar. Bu programlar yanyana gelmemiş insanları aynı resim içinde göstermek, hiç gitmediğiniz yerlerde çekilmiş fotoğraflar oluşturmak, var olan arabanızın rengini değiştirmek gibi işlemler de yapılabilir.',
            buttonText: 'Ayrıntılar',
            kategoriLink: {
                kategoriLink: 'gorsel-bilisim'
            }
        }];
        var meslekiEgitimBannerSok = function () {
            $timeout(function () {
                $scope.meslekiEgitim =
                    'partials/mesleki-egitim-alin.html';
            }, 300);
        };
        $timeout(function () {
            var a = 0;
            var inter = $interval(function () {
                if (a < egitimler.length) {
                    $scope.egitimler.push(egitimler[a]);
                    a++;
                } else {
                    $interval.cancel(inter);
                    meslekiEgitimBannerSok();
                }
            }, 300);
        }, 1200);
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
        EgitimlerResource, EgitimByUrlResource, $stateParams) {
        var getEgitim = function () {
            $scope.egitim = EgitimByUrlResource.get({
                egitimUrl: $stateParams.egitimUrl
            }, function () {
                console.log($scope.egitim);
            });
        };
        getEgitim();
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