var lupusshow = angular.module('lupusshow', ['ngAnimate', 'lupusshow.filters',
    'lupusshow.services', 'lupusshow.directives', 'lupusshow.controllers',
    'ngResource', 'ngSanitize', 'google-maps', 'ui.router', 'lupus',
    'ngTouch'
]);
lupusshow.run(function ($rootScope, $state, $stateParams, StatesSrvc) {
    "use strict";
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});