/*global angular:true, document:true,window:true */
/*jshint unused:false */
"use strict";
var lupus = angular.module("lupus", ["lupus.acrophobia", "lupus.danceFloor",
    "lupus.scrollDisplay", "lupus.templates", "lupus.disko",
    "lupus.service", 'lupus.evliya'
]);

/**
 * @ngdoc service
 * @name lupus.acrofobia.service
 * @restrict EA
 *
 * @description
 * Sayfanın scrollTop değerini ihtiva eden obje döndürür.
 */
angular.module("lupus.acrophobia", [])
    .factory("$acrophobia", function () {
        var doc = document.documentElement,
            acrophobia = {};
        acrophobia.top = 0;

        function setPostion() {
            acrophobia.top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop ||
                0);
        }
        setPostion();
        acrophobia.update = setPostion;
        return acrophobia;
    });
angular.module('lupus.service', [])
/* .factory('windowSizeReferance', function () {
        var w = window,
            d = document,
            de = d.documentElement,
            b = d.getElementsByTagName('body')[0],
            windowSize = {};

        function calcWindowSize() {
            windowSize.width = w.innerWidth || de.clientWidth || b.clientWidth;
            windowSize.height = w.innerHeight || de.clientHeight || b.clientHeight;
        }

        calcWindowSize();

        window.onresize = function () {
            calcWindowSize();
        };

        return function (referance) {
            referance.window.width = windowSize.width;
            referance.window.height = windowSize.height;
        };
    })*/
.factory('resizeCommander', function () {
    var allResizeCommands = [],
        calc = function () {
            var w = window,
                d = document,
                e = d.documentElement,
                g = d.getElementsByTagName('body')[0];
            return {
                width: w.innerWidth || e.clientWidth || g.clientWidth,
                height: w.innerHeight || e.clientHeight || g.clientHeight
            };
        };
    window.addEventListener('resize', function () {
        var size = calc();
        angular.forEach(allResizeCommands, function (resize) {
            resize(size);
        });
    });
    return {
        addCommand: function (command) {
            allResizeCommands.push(command);
        }
    };
})
    .factory('windowSize', function () {
        var x, y,
            calc = function () {
                var w = window,
                    d = document,
                    e = d.documentElement,
                    g = d.getElementsByTagName('body')[0];
                x = w.innerWidth || e.clientWidth || g.clientWidth;
                y = w.innerHeight || e.clientHeight || g.clientHeight;
            };
        return function () {
            calc();
            return {
                width: x,
                height: y
            };
        };
    });
angular.module('lupus.scrollDisplay', ['lupus.acrophobia'])
    .directive('scrollDisplay', ['$acrophobia',
        function ($acrophobia) {
            // Runs during compile
            return {
                // name: '',
                // priority: 1,
                // terminal: true,
                // scope: {}, // {} = isolate, true = child, false/undefined = no change
                // controller: function($scope, $element, $attrs, $transclude) {},
                // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
                restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
                // template: ,
                templateUrl: '',
                replace: true,
                transclude: true,
                // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
                link: function ($scope, iElm, iAttrs, controller) {
                    $scope.scrollPosition = $acrophobia;
                    window.onscroll = function () {
                        $acrophobia.update();
                        $scope.$apply();
                    };
                }
            };
        }
    ]);
angular.module('lupus.danceFloor', [])
    .controller('DanceFloorCtrl', ['$scope',
        function ($scope) {}
    ])
    .directive('danceFloor', [

        function () {
            // Runs during compile
            return {
                // name: '',
                // priority: 1,
                // terminal: true,
                scope: {
                    elemanlar: "="
                }, // {} = isolate, true = child, false/undefined = no change
                // controller: function($scope, $element, $attrs, $transclude) {},
                // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
                restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
                // template: '',
                // templateUrl: '',
                // replace: true,
                transclude: true,
                // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
                link: function ($scope, iElm, iAttrs, controller) {
                    var autoSetFloorWidth = function () {
                        $scope.floorWidth = iElm[0].getBoundingClientRect()
                            .width;
                    };
                    window.addEventListener('resize', autoSetFloorWidth);
                    autoSetFloorWidth();
                }
            };
        }
    ]);
angular.module('lupus.disko', [])
    .directive('lupusDiskoImg', function () {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            scope: {
                slideNo: "=",
            },
            // controller: function($scope, $element, $attrs, $transclude) {},
            require: '^lupusDisko', // Array = multiple requires, ? = optional, ^ = check parent elements
            // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'template/lupus/disko/lupus-disko-img.html',
            replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function ($scope, iElm, iAttrs, diskoCtrl) {
                $scope.slide = diskoCtrl.slides[$scope.slideNo];
                diskoCtrl.scope.slideElm = iElm;
                diskoCtrl.scope.slideScope = $scope;
                iElm.on("load", function (event) {
                    diskoCtrl.slides[$scope.slideNo].slideW = iElm[0].naturalWidth;
                    diskoCtrl.slides[$scope.slideNo].slideH = iElm[0].naturalHeight;
                });
            }
        };
    })
    .directive('lupusDiskoImgWrapper', function () {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            scope: {
                slideNo: "=",
            },
            // {} = isolate, true = child, false/undefined = no change
            controller: function ($scope, $element, $attrs, $transclude) {},
            require: '^lupusDisko',
            // Array = multiple requires, ? = optional, ^ = check parent elements
            restrict: 'AE',
            // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'template/lupus/disko/lupus-disko-img-wrapper.html',
            replace: true,
            //transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function ($scope, iElm, iAttrs, diskoCtrl) {
                $scope.slide = diskoCtrl.slides[$scope.slideNo];
                //standart ng-repeat animasyonları yerine böyle bir şeyler yaptık
                $scope.activate = function () {
                    iElm.addClass('active');
                };
                diskoCtrl.scope.wrapperScope = $scope;
                diskoCtrl.scope.wrapperElm = iElm;
            }
        };
    })
    .directive('lupusDiskoVideoIntro', function () {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            scope: {
                videoIntro: "=videoIntro"
            },
            // controller: function($scope, $element, $attrs, $transclude) {},
            require: '^lupusDisko',
            // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'template/lupus/disko/disko-video-intro.html',
            replace: true,
            transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function ($scope, iElm, iAttrs, diskoCtrl) {
                diskoCtrl.scope.videoIntroScope = $scope;
                diskoCtrl.scope.videoIntroElm = iElm;
                iElm.bind('ended', function () {
                    diskoCtrl.scope.videoIntroEnded();
                });
            }
        };
    })
    .directive('lupusDiskoVideoIntroWrapper', function () {
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            scope: {
                videoIntro: "=videoIntro"
            },
            // {} = isolate, true = child, false/undefined = no change
            // controller: function($scope, $element, $attrs, $transclude) {},
            require: '^lupusDisko',
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            restrict: 'AE',
            // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'template/lupus/disko/disko-video-intro-wrapper.html',
            // replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ 
            // return function linking(scope, elm, attrs){}})),
            link: function ($scope, iElm, iAttrs, diskoCtrl) {
                diskoCtrl.scope.wrapperScope = $scope;
                diskoCtrl.scope.wrapperElm = iElm;
            }
        };
    })
    .directive('lupusDisko', function ($interval, $document, windowSize,
        $timeout) {
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            scope: {
                slides: '=',
                background: '=',
                videoIntro: '='
            },
            // {} = isolate, true = child, false/undefined = no change
            controller: function ($scope, $element, $attrs, $transclude) {
                var timer = null;
                //var pozTimer = null;
                var activateTimer = null;
                this.scope = $scope;
                $scope.allSlides = [];
                $scope.nextSlide = 0;
                $scope.startTimer = function () {
                    timer = $timeout(function () {
                        $scope.next();
                    }, 10000);
                };
                $scope.prev = function () {
                    if (timer) $timeout.cancel(timer);
                    if (activateTimer) $timeout.cancel(activateTimer);
                    $scope.slides.shift();
                    $scope.nextSlide--;
                    if ($scope.nextSlide >= 0) $scope.nextSlide = $scope.nextSlide %
                        $scope.allSlides.length;
                    else $scope.nextSlide = $scope.allSlides.length +
                        $scope.nextSlide;
                    $scope.activate();
                };
                $scope.next = function () {
                    if ($scope.introPlaying) {
                        $scope.videoIntroEnded();
                        return $scope.videoIntroElm[0].pause();
                    }
                    if (timer) $timeout.cancel(timer);
                    if (activateTimer) $timeout.cancel(activateTimer);
                    $scope.slides.shift();
                    $scope.nextSlide++;
                    $scope.nextSlide = $scope.nextSlide % $scope.allSlides.length;
                    $scope.activate();
                };
                $scope.activate = function () {
                    $scope.slides.push($scope.allSlides[$scope.nextSlide]);
                    $scope.slideNo = $scope.nextSlide;
                    activateTimer = $timeout(function () {
                        $scope.startTimer();
                        $scope.$apply();
                        $scope.pozisyonla();
                        $scope.wrapperScope.activate();
                    }, 300);
                };
                $scope.pozisyonla = function () {
                    $scope.slideBox = $scope.slideElm[0].getBoundingClientRect();
                    $scope.wrapperBox = $scope.wrapperElm[0].getBoundingClientRect();
                    var iW = $scope.slideElm[0].naturalWidth,
                        iH = $scope.slideElm[0].naturalHeight,
                        wW = $scope.width,
                        wH = $scope.height;
                    $scope.slideElm.css('height', '');
                    $scope.slideElm.css('width', '');
                    var dikeyOrtala = function () {
                        $scope.slideElm.css('height', iH + 'px');
                        var mT = ((wH - iH) / 2);
                        //console.log('mt', mT)
                        if (iH <= wH) {
                            $scope.slideElm.css('margin-top', ((mT >= 0) ?
                                mT : 0) + 'px');
                        } else {
                            $scope.slideElm.css('margin-top', mT + 'px');
                        }
                        iW = $scope.slideElm[0].getBoundingClientRect()
                            .width;
                    };
                    var dikeyYerlestir = function () {
                        //console.log('dikeyYerlestir');
                        $scope.slideElm.css('height', wH + 'px');
                        iW = $scope.slideElm[0].getBoundingClientRect()
                            .width;
                    };
                    var yatayOrtala = function () {
                        //console.log('yatayOrtala')
                        $scope.slideElm.css('width', iW + 'px');
                        $scope.slideElm.css('margin-left', 'auto');
                        $scope.slideElm.css('margin-right', 'auto');
                        iH = $scope.slideElm[0].getBoundingClientRect()
                            .height;
                        $timeout(function () {
                            iH = $scope.slideElm[0].getBoundingClientRect()
                                .height;
                        });
                    };
                    var yatayYerlestir = function () {
                        //console.log('yatayYerlestir')
                        $scope.slideElm.css('width', wW + 'px');
                        iH = $scope.slideElm[0].getBoundingClientRect()
                            .height;
                    };
                    /*
dikeyYerlestir angular-lupus-0.2.0.js:265
yatayOrtala angular-lupus-0.2.0.js:270
861 1357 574 574 */
                    if (iW < wW && iH < wH) {
                        yatayOrtala();
                        dikeyOrtala();
                    } else if (iH < wH && iW >= wW) {
                        yatayYerlestir();
                        dikeyOrtala();
                    } else if (iH >= wH && iW < wW) {
                        dikeyYerlestir();
                        yatayOrtala();
                    } else if (iH >= wH && iW >= wW) {
                        if ((iH / iW) >= 1) {
                            dikeyOrtala();
                            yatayYerlestir();
                        }
                        if ((iW / iH) > 1) {
                            yatayYerlestir();
                            dikeyOrtala();
                        }
                    }
                    //yandan ortalanacak
                    //eğer uzunsa uste oturtulacak
                    //tam yada kısaysa ustten ortalanacak
                };
                $scope.initSlider = function () {
                    $timeout(function () {
                        $scope.activate();
                        $scope.startTimer();
                    }, 500);
                };
                $scope.videoIntroEnded = function () {
                    $scope.slides = [];
                    $scope.introPlaying = false;
                    $scope.initSlider();
                    $scope.videoGrid = true;
                    $scope.$apply();
                };
                $scope.initVideoIntro = function () {
                    //kontrol video introya geçer
                };
                $scope.init = function () {
                    $scope.allSlides = angular.copy($scope.slides);
                    $scope.slides = [];
                    if ($scope.videoIntro) {
                        $scope.introPlaying = true;
                        $scope.slides.push($scope.videoIntro);
                        $scope.initVideoIntro();
                    } else {
                        $scope.initSlider();
                    }
                };
                this.slides = $scope.slides;
                $timeout(function () {
                    $scope.init();
                }, 100);
                this.style = $scope.style;
            },
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            restrict: 'AE',
            // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'template/lupus/disko/disko.html',
            replace: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ 
            // return function linking(scope, elm, attrs){}})),
            link: function ($scope, iElm, iAttrs, controller) {
                var areaSize = function () {
                    return iElm[0].getBoundingClientRect();
                };
                $scope.style = {};
                $scope.oldWindowHeight = windowSize()
                    .height;
                var onResize = function () {
                    $scope.style.height = '';
                    $scope.style.width = '';
                    $scope.area = areaSize();
                    $scope.height = $scope.area.height;
                    $scope.width = $scope.area.width;
                    if (!$scope.height || $scope.oldWindowHeight !==
                        windowSize()
                        .height) {
                        $scope.oldWindowHeight = $scope.height = windowSize()
                            .height - 51;
                    }
                    $scope.style = {
                        height: $scope.height + 'px'
                    };
                    if ($scope.run) {
                        $scope.$apply('style');
                    }
                    $scope.poztimer = $timeout(function () {
                        $timeout.cancel($scope.poztimer);
                        if ($scope.slideElm) $scope.pozisyonla();
                    }, 1000);
                };
                onResize();
                window.addEventListener('resize', function () {
                    onResize();
                });
                document.body.addEventListener('resize', function () {
                    onResize();
                });
                $scope.iElm = iElm;
                $scope.run = true;
            }
        };
    });
angular.module('lupus.evliya', [])
    .directive('lupusEvliyaNavbar', function (windowSize, $rootScope) {
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            scope: {
                links: '='
            },
            //require: '^lupusDisko',
            // {} = isolate, true = child, false/undefined = no change
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            restrict: 'AE',
            // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'template/lupus/evliya/evliya-navbar.html',
            replace: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function ($scope, iElm, iAttrs, diskoController) {
                $scope.stateName = $rootScope.$state.current.name;
                $scope.window = {};
                $scope.window = windowSize();
                $scope.box = iElm[0].getBoundingClientRect();
                iElm.css({
                    'transition': '.3s ease-in-out',
                    '-webkit-transition': '.3s ease-in-out'
                });
                $scope.pozisyonla = function () {
                    var poz = 0;
                    $scope.window = windowSize();
                    if ($scope.stateName !== 'home') {
                        poz = 0;
                    } else {
                        poz = $scope.window.height - 76 + 'px';
                    }
                    iElm.removeClass('navbar-fixed-bottom');
                    iElm.css({
                        'position': 'absolute',
                        'top': poz,
                        'left': 0,
                        'right': 0
                    });
                };
                $scope.pozisyonla();
                window.addEventListener('resize', function () {
                    $scope.stateName = $rootScope.$state.current.name;
                    $scope.pozisyonla();
                });
                $rootScope.$on('$stateChangeSuccess', function (event,
                    toState, toParams, fromState, fromParams) {
                    $scope.stateName = toState.name;
                    $scope.pozisyonla();
                });
                window.onresize = function () {
                    collapseControl();
                };

                function collapseControl() {
                    if (document.body.getBoundingClientRect()
                        .width <= 980) {
                        iElm.addClass('collepsed');
                    } else iElm.removeClass('collepsed');
                }
                collapseControl();
            }
        };
    });
angular.module("lupus.templates", [
    "templates/lupus/scroll-display/display.html"
]);
/*
angular.module('template/lupus/disko/disko.html', [])
    .run(['$templateCache'], function ($templateCache) {
        $templateCache.put("template/typeahead/typeahead-popup.html",
            '');
    });
*/
angular.module("templates/lupus/scroll-display/display.html", [])
    .run(["$templateCache",
        function ($templateCache) {
            $templateCache.put("template/typeahead/typeahead-popup.html",
                '<div style="position:fixed;top:10px;left:10px;padding:10px;' +
                'background-color:red;z-index:99999">Scroll Top: {{scrollPosition.top}}</div>'
            );
        }
    ]);
if (!angular.isEmptyObject) {
    angular.isEmptyObject = function (obj) {
        var name;
        for (name in obj) {
            return false;
        }
        return true;
    };
}