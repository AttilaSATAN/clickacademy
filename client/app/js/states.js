angular.module('lupusshow')
    .config(
        ['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                "use strict";
                $urlRouterProvider.otherwise('/');
                $stateProvider.state("home", {
                    // Use a url of "/" to set a states as the "index".
                    url: "/",
                    // Example of an inline template string. By default, templates
                    // will populate the ui-view within the parent state's template.
                    // For top level states, like this one, the parent template is
                    // the index.html file. So this template will be inserted into the
                    // ui-view within index.html.
                    views: {
                        'top': {
                            templateUrl: 'partials/home.html',
                            controller: 'HomeCtrl'
                        },
                        'bottom': {}
                    }
                })
                    .state('egitimler', {
                        abstract: true,
                        url: '/egitimler',
                        views: {
                            'top': {},
                            'bottom': {
                                templateUrl: 'partials/egitimler.html',
                                controller: 'EgitimlerCtrl'
                            },
                        }
                    })
                    .state('egitimler.kategoriler', {
                        url: '/kategoriler',
                        templateUrl: 'partials/egitimler.kategoriler.html',
                        controller: 'EgitimlerKategoriCtrl'
                    })
                    .state('egitimler.kategori', {
                        abstract: true,
                        url: '/kategori',
                        templateUrl: 'partials/egitimler.kategori.html',
                        controller: 'EgitimlerKategoriCtrl'
                    })
                    .state('egitimler.kategori.egitimListesi',{
                        url:'/:kategoriUrl',
                        templateUrl:'partials/egitimler.kategori.egitim-listesi.html',
                        controller:'EgitimlerKategoriEgitimListesiCtrl'
                    })
                    .state('egitim', {
                        url: '/egitim/:egitimLink',
                        templateUrl: 'partials/egitim.html',
                        controller: 'KursCtrl'
                    })
                    .
                state('mesleki-uzmanlik-egitimi', {
                    url: '/mesleki-uzmanlik-egitimi',
                    views: {
                        'top': {},
                        'bottom': {
                            templateUrl: 'partials/mesleki-uzmanlik-egitimi.html',
                            controller: 'HakkimizdaCtrl'
                        },
                    }
                })
                    .state('templates', {
                        url: '/templates',
                        views: {
                            'top': {},
                            'bottom': {
                                templateUrl: 'partials/yonetim/states.html',
                                controller: 'YonetimTemplatesCtrl'
                            }
                        }
                    });
            }
        ]);