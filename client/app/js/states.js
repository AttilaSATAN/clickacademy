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
                        url: '/egitimler',
                        views: {
                            'top': {},
                            'bottom': {
                                templateUrl: 'partials/egitimler.html',
                                controller: 'EgitimlerCtrl'
                            },
                        }
                    })
                    .state('egitimler.sektorel', {
                        url: '/sektorel',
                        views: {
                            'top@': {},
                            'bottom@': {
                                templateUrl: 'partials/egitimler.sektorel.html',
                                controller: 'SektorelCtrl',
                            }
                        }
                    })
                    .state('egitimler.sektorel.icerik', {
                        url: '/:sektorelEgitimUrl',
                        views: {
                            'sektorelEgitimIcerik': {
                                templateUrl: 'partials/egitimler.sektorel.icerik.html',
                                controller: 'SektorelCtrl',
                            }
                        }
                    })
                    .state('egitimler.akademik', {
                        url: '/akademik',
                        views: {
                            'top@': {},
                            'bottom@': {
                                templateUrl: 'partials/egitimler.akademik.html',
                                controller: 'AkademikCtrl',
                            }
                        }
                    })
                    .state('egitimler.akademik.icerik', {
                        url: '/:akademikEgitimUrl',
                        views: {
                            'akademikEgitimIcerik': {
                                templateUrl: 'partials/egitimler.akademik.icerik.html',
                                controller: 'AkademikCtrl',
                            }
                        }
                    })
                    .state('egitimler.kategori', {
                        abstract: true,
                        url: '/kategori',
                        views: {
                            'top@': {},
                            'bottom@': {
                                templateUrl: 'partials/egitimler.kategoriler.html',
                                controller: 'KategorilerCtrl',
                            }
                        }
                    })
                    .state('egitimler.kategori.liste', {
                        url: '/liste',
                        views: {
                            'kategorilistesi': {
                                templateUrl: 'partials/egitimler.kategori.liste.html',
                                controller: 'KategoriListesiCtrl',
                            }
                        }
                    })
                    .state('egitimler.kategori.liste.kategori', {
                        url: '/:categoryUrl',
                        views: {
                            'kategoriegitimleri': {
                                templateUrl: 'partials/egitimler.kategori.liste.kategori.html',
                                controller: 'KategoriEgitimleriCtrl'
                            }
                        }
                    })
                    .state('egitimler.kategori.liste.kategori.egitim', {
                        url: '/:egitimUrl',
                        views: {
                            'egitim': {
                                templateUrl: 'partials/egitim.html',
                                controller: 'EgitimCtrl',
                            }
                        }
                    })
                    .state('mesleki-uzmanlik-egitimi', {
                        url: '/mesleki-uzmanlik-egitimi',
                        views: {
                            'top': {},
                            'bottom': {
                                templateUrl: 'partials/mesleki-uzmanlik-egitimi.html',
                                controller: 'HakkimizdaCtrl'
                            },
                        }
                    })
                    .state('hakkimizda', {
                        url: '/hakkimizda',
                        views: {
                            'top': {},
                            'bottom': {
                                templateUrl: 'partials/hakkimizda.html',
                                contoller: 'IletisimCtrl'
                            }
                        }
                    })
                    .state('takvim',{
                        url:'/egitim-takvimi',
                        views:{
                            top:{},
                            bottom:{
                                templateUrl:'partials/egitim-takvimi.html',
                                controller:'EgitimTakvimiCtrl'
                            }
                        }
                    })
                    .state('iletisim', {
                        url: '/iletisim',
                        views: {
                            'top': {},
                            'bottom': {
                                templateUrl: 'partials/iletisim.html',
                                controller: 'IletisimCtrl'
                            }
                        }
                    })
                    .state('blog', {
                        url: '/blog/:blogUrl',
                        views: {
                            'top': {},
                            'bottom': {
                                templateUrl: 'partials/blog.html',
                                controller: 'BlogCtrl'
                            }
                        }
                    })
                    .state('blogs', {
                        url: '/bloglar',
                        views: {
                            'top': {},
                            'bottom': {
                                templateUrl: 'partials/blog.html',
                                controller: 'BlogCtrl'
                            }
                        }
                    })
                    .state('yonetim', {
                        url: '/yonetim',
                        views: {
                            'top': {},
                            'bottom': {
                                templateUrl: 'partials/yonetim/index.html',
                                controller: 'YonetimCtrl'
                            }
                        }
                    })
                    .state('yonetim.blogs', {
                        url: '/bloglar',
                        templateUrl: 'partials/yonetim/blogs.html',
                        controller: 'YonetimBlogsCtrl'
                    })
                    .state('yonetim.blog', {
                        url: '/blog/:blogUrl',
                        templateUrl: 'partials/yonetim/blog.html',
                        controller: 'YonetimBlogCtrl'
                    })
                    .state('yonetim.egitim-kategorileri', {
                        url: '/blog',
                        templateUrl: 'partials/yonetim/egitim-kategorileri.html',
                        controller: 'YonetimEgitimKategorileriCtrl'
                    })
                    .state('yonetim.egitimler', {
                        url: '/egitimler',
                        templateUrl: 'partials/yonetim/egitimler.html',
                        controller: 'YonetimEgitimlerCtrl'
                    })
                    .state('yonetim.academic', {
                        url: '/academic-egitimler',
                        templateUrl: 'partials/yonetim/academic.html',
                        controller: 'YonetimAcademicCtrl'
                    })
                    .state('yonetim.academic-page', {
                        url: '/academic-egitimler/:academicId',
                        templateUrl: 'partials/yonetim/academic-page.html',
                        controller: 'YonetimAcademicCtrl'
                    })
                    .state('yonetim.sektorel', {
                        url: '/sektorel-egitimler',
                        templateUrl: 'partials/yonetim/sektorel.html',
                        controller: 'YonetimSektorelCtrl'
                    })
                    .state('yonetim.sektorel-page', {
                        url: '/sektorel-sayfasi/:sektorelId',
                        templateUrl: 'partials/yonetim/sektorel-page.html',
                        controller: 'YonetimSektorelCtrl'
                    })
                    .state('yonetim.slider', {
                        url: '/slider',
                        templateUrl: 'partials/yonetim/slider.html',
                        controller: 'YonetimSliderCtrl'
                    })
                    .state('yonetim.users', {
                        url: '/users',
                        templateUrl: 'partials/yonetim/users.html',
                        controller: 'YonetimUserCtrl'
                    })
                    .state('yonetim.training', {
                        url: '/sinif',
                        templateUrl: 'partials/yonetim/training.html',
                        controller: 'YonetimTrainingCtrl'
                    });
            }
        ]);