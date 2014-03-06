/* globals angular:true, console:true */
angular.module('cekirdekEmlak', ['ngRoute', 'ngAnimate', 'cekirdekEmlak.filters', 'cekirdekEmlak.services', 'cekirdekEmlak.directives', 'cekirdekEmlak.controllers', 'ngSanitize', 'mgcrea.ngStrap', 'google-maps', 'lupus', 'enviroment', 'angularFileUpload']).
config(function ($routeProvider, $logProvider, ENVIROMENT) {
    "use strict";
    

    $logProvider.debugEnabled(ENVIROMENT === 'dev');

    $routeProvider.when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
    });

    $routeProvider.when('/hakkimizda', {
        templateUrl: 'partials/hakkimizda.html',
        controller: 'HomeCtrl'
    });

    $routeProvider.when('/projelerimiz', {
        templateUrl: 'partials/projelerimiz.html',
        controller: 'HomeCtrl'
    });

    $routeProvider.when('/ilanlar', {
        templateUrl: 'partials/ilanlar.html',
        controller: 'IlanlarCtrl',
        resolve: {
            'ilanlar': function (IlanlarSrvc, $q) {
                var deferred = $q.defer();
                IlanlarSrvc.get().then(function (res) {
                    deferred.resolve(res.data[1]);
                });
                return deferred.promise;
            }
        }
    });

    $routeProvider.when('/yonetim', {
        templateUrl: 'partials/yonetim/giris.html',
        controller: 'YonetimCtrl'
    });
    $routeProvider.when('/yonetim/ilan/yeni', {
        templateUrl: 'partials/yonetim/ilan.html',
        controller: 'IlanCtrl',
        resolve: {
            'ilan': function () {
                return null;
            }
        }
    });
    $routeProvider.when('/yonetim/ilan/duzenle/:_id', {
        templateUrl: 'partials/yonetim/ilan.html',
        controller: 'IlanCtrl',
        resolve: {
            'ilan': function (IlanlarSrvc, $q, $route) {

                var deferred = $q.defer();

                console.log("resolve ilanlar", $route.current.params);

                IlanlarSrvc.get($route.current.params._id).then(function (res) {
                    deferred.resolve(res.data[1]);
                });

                return deferred.promise;
            }
        },
    });

    $routeProvider.when('/yonetim/ilanlar', {
        templateUrl: 'partials/yonetim/ilanlar.html',

        resolve: {
            'ilanlar': function (IlanlarSrvc, $q) {
                var deferred = $q.defer();
                IlanlarSrvc.get().then(function (res) {
                    deferred.resolve(res.data[1]);
                });
                return deferred.promise;
            }
        },
        controller: 'IlanlarCtrl'
    });

    /*
	$routeProvider.when('/kategoriler', {
		templateUrl: '/partials/kategoriler.html',
		controller: 'KategıriDuzenlemeCtrl'
	});
*/
    $routeProvider.when('/ilan/:ilanKategorisi/:_id', {
        templateUrl: 'partials/ilan.ayrintilari.html',
        controller: 'IlanCtrl',
        resolve: {
            'ilan': function (IlanlarSrvc, $q, $route) {

                var deferred = $q.defer();

                console.log("resolve ilanlar", $route.current.params);

                IlanlarSrvc.get($route.current.params._id).then(function (res) {
                    deferred.resolve(res.data[1]);
                });

                return deferred.promise;
            }
        },

    });

    $routeProvider.otherwise({
        redirectTo: '/'
    });

}).
run(['$rootScope', 'dil', '$window', '$acrophobia',
    function ($rootScope, dil, win, $acrophobia) {

        "use strict";

        $rootScope.scrollPosition = {};
        $rootScope.scrollPosition = $acrophobia;
        $rootScope.$apply(function () {
            $rootScope.scrollPosition = $acrophobia;
        });
        //TODO Bunu serviceden alacaksın
        $rootScope.ilanTurleri = [{
            _id: "ilanturuid1",
            name: "Satılık"
 }, {
            _id: "ilanturuid2",
            name: "Kiralık"
 }, {
            _id: "ilanturuid3",
            name: "Fabrika"
 }];

        //TODO Bunu serviceden alacaksın
        $rootScope.gayrimenkulTurleri = [{
            _id: "gayrimenkulid1",
            name: "Konut"
 }, {
            _id: "gayrimenkulid2",
            name: "İş Yeri"
 }, {
            _id: "gayrimenkulid3",
            name: "Arsa"
 }, {
            _id: "gayrimenkulid4",
            name: "Fabrika"
 }];



        $rootScope.map = {
            center: {
                latitude: 39.991162,
                longitude: 32.738901
            },
            zoom: 9
        };

        $rootScope.resimler = ["ilan1-1.jpg", "ilan1-2.jpg", "ilan1-3.jpg", "ilan1-4.jpg", "ilan1-5.jpg", "ilan1-6.jpg", ];
        $rootScope.seciliResim = {};
        $rootScope.seciliResim.src = $rootScope.resimler[0];
        $rootScope.seciliFiltreler = {
            ilanTuru: '*',
            gayrimenkulTuru: '*',
            altFiyat: 0,
            ustFiyat: 0
        };


        $rootScope.toplamAlan = function (katlar) {
            var toplam = null;
            angular.forEach(katlar, function (kat) {
                toplam += kat.alan ? kat.alan : 0;
            });
            return toplam;
        };


        $rootScope.d = function (key) {
            return dil.k2Value(key);
        };

        $rootScope.k = function (value) {
            return dil.v2Key(value);
        };

        $rootScope.slugify = function (text) {
            if (!text) return '';
            var trMap = {
                'çÇ': 'c',
                'ğĞ': 'g',
                'şŞ': 's',
                'üÜ': 'u',
                'ıİ': 'i',
                'öÖ': 'o'
            };
            for (var key in trMap) {
                text = text.replace(new RegExp('[' + key + ']', 'g'), trMap[key]);
            }
            return text.replace(/[^-a-zA-Z0-9\s]+/ig, '') // remove non-alphanumeric chars
            .replace(/\s/gi, "_") // convert spaces to dashes
            .replace(/[-]+/gi, "_") // trim repeated dashes
            .toLowerCase();
        };


        $rootScope.sahteGiris = {
            girildi: false
        };

}]);