/*global angular */
/*jshint devel:true, browser:true */
angular.module('lupusshow.controllers', [])
    .controller('HomeCtrl', function ($scope, $timeout) {
        "use strict";
        
        $scope.videoIntro = {
            type: 'video',
            srcs: [{
                src: 'video/1920-768-3.webm',
                type: 'video/webm'
            }, {
                src: 'video/1920-768-3.mp4',
                type: 'video/mp4'
            }]
        };
        
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
    .controller('EgitimlerKategoriCtrl',  function ($scope, $rootScope, $timeout, $stateParams, $interval) {
        var eklenecekler = [];


        $scope.kurslar = [];
        $scope.kategoriLink2categoryId = {};

        $scope.add2Page = function (kurs) {
                $scope.kurslar.push(kurs);
        };

        angular.forEach($rootScope.kategoriler, function (kategori) {
            $scope.kategoriLink2categoryId[kategori.link] = kategori._id;
        });

        angular.forEach($rootScope.kurslar, function (kurs) {
            if(kurs._categoryId == $scope.kategoriLink2categoryId[$stateParams.kategoriLink])
                eklenecekler.push(kurs);
        });
        $timeout(function () {
           var a = 0;
            var inter = $interval(function () {
                if (a < eklenecekler.length) {
                   $scope.add2Page(eklenecekler[a]);
                    a++;
                } else {
                    $interval.cancel(inter);
                }
            }, 300);
        }, 1000);

        console.log($stateParams.kategoriLink,$scope.kategoriLink2categoryId ,$rootScope.kategoriler);
    }).
controller('EgitimlerKategoriEgitimListesiCtrlCtrl', function ($scope) {
    
}).controller('KursCtrl', function ($scope) {
        $scope.kurs = {
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
            
            $scope.bloglar = ['C++ İle Object Orianted Programlama', 'Header Dosyaları', 'QT'];
            $scope.mesleki = ['Programlama Kariyer Eğitimi'];

    })
    .controller('EgitimlerCtrl', function ($scope, $interval, $timeout) {
        $scope.egitimler = [];
        var egitimler = [{
            header: 'Temel Bilgisayar',
            text: 'Photoshop bir grafik düzenleme programıdır. Grafik düzenleme yazılımları (Photo Editing Software)', 
            buttonText: 'Ayrıntılar',
            kategoriLink: {kategoriLink:'temel-bilgisayar-egitimi'}
        }, {
            header: 'Bilişim Teknolojileri',
            text: 'Bundan dolayı içerdiği çizim araçları, kalem ve fırçadan çok, kesme kopyalama ve silme üzerine dayalıdır. Bu tip programlar kabaca örnek vermek gerekirse, iki resmin montajlanmasından var ',
            buttonText: 'Ayrıntılar',
            kategoriLink: {kategoriLink:'bilisim-teknolojileri'}
        }, {
            header: 'Görsel Bilişim',
            text: 'Photoshop yeni bir resim oluşturmaktan bir çok alanda kullanılırlar. Bu programlar yanyana gelmemiş insanları aynı resim içinde göstermek, hiç gitmediğiniz yerlerde çekilmiş fotoğraflar oluşturmak, var olan arabanızın rengini değiştirmek gibi işlemler de yapılabilir.',
            buttonText: 'Ayrıntılar',
            kategoriLink: {kategoriLink:'gorsel-bilisim'}
        }];

        var meslekiEgitimBannerSok = function () {
            $timeout(function () {
                $scope.meslekiEgitim = 'partials/mesleki-egitim-alin.html';
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


    }).controller('YonetimCtrl', ['$scope', function ($scope) {
        
    }]).controller('YonetimStatesCtrl',  function ($scope, StateResource) {

        $scope.states = StateResource.query(function () {
            console.log(arguments);
        });

        $scope.create = function (){

        };
        //$scope.update = function (){};
        
        
    }).controller('YonetimTemplatesCtrl', ['$scope', 'PartialsResource', 'slugify', 'TemplateResource', function ($scope, PartialsResource, slugify, TemplateResource) {
        console.log(PartialsResource)
        $scope.data = PartialsResource.get(function () {
            console.log(arguments);
        });
        $scope.state = {};
        
        $scope.$watch('state.pageName', function () {
            $scope.state.url = slugify($scope.state.pageName);
        });
        $scope.kaydet = function () {
        }
        //$scope.partials = PartialsResource.query();
    }]).controller('YonetimProgramCategoryCtrl', function (ProgramCategoryResource) {
        $scope.programCategories = ProgramCategoryResource.get();
        
    });