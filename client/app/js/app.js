/*global angular:true */
var lupusshow = angular.module('lupusshow', ['ngAnimate', 'lupusshow.filters',
    'lupusshow.services', 'lupusshow.directives', 'lupusshow.controllers',
    'ngSanitize', 'google-maps', 'ui.router', 'lupus', 'ngTouch',
    'ngResource', 'angularFileUpload'
]);
lupusshow.run(
    ['$rootScope', '$state', '$stateParams', '$timeout',
        function ($rootScope, $state, $stateParams, $timeout) {
            "use strict";
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.hideFrame1 = $rootScope.$state.current === 'home';
            console.log($rootScope.hideFrame1)
            $rootScope.$on('$stateChangeSuccess', function () {
                
                $rootScope.hideFrame1 = $rootScope.$state.current.name ===
                    'home';
                $timeout(function () {
                    $rootScope.$apply('hideFrame1');
                })
            });

        }
    ]);