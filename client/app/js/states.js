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
                // .state('yonetim.slides', {
                //     url: '/bloglar',
                //     templateUrl: 'partials/yonetim/slides.html',
                //     controller: 'YonetimSlidesCtrl'
                // })
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
                    .state('yonetim.akademik', {
                        url: '/mesleki-egitimler',
                        templateUrl: 'partials/yonetim/akademik-egitimler.html',
                        controller: 'YonetimEgitimlerCtrl'
                    })
                    .state('yonetim.sektorel', {
                        url: '/sektorel-egitimler',
                        templateUrl: 'partials/yonetim/egitimler.html',
                        controller: 'YonetimEgitimlerCtrl'
                    })
                    .state('yonetim.egitim-sayfasi', {
                        url: '/egitim-sayfasi/:egitimUrl',
                        templateUrl: 'partials/yonetim/egitim-sayfasi.html',
                        controller: 'YonetimEgitimSayfasiCtrl'
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
                    });
            }
        ]);