/* Filters */
angular.module('lupusshow.filters', [])
    .filter('notContains', function ($scope) {
        return function notContains(arrayItem) {
            consoel.log(arrayItem);
            return arrayItem;
        };
    });