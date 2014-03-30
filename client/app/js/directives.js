/* Directives */
angular.module('lupusshow.directives', [])
    .directive('menuPosition', function () {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            // scope: {}, // {} = isolate, true = child, false/undefined = no change
            // controller: function($scope, $element, $attrs, $transclude) {},
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            // templateUrl: '',
            // replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function ($scope, iElm, iAttrs, controller) {
                //$scope.position = 
            }
        };
    })
    .directive('lupusAssetsB', function ($http, $timeout, $upload, slugify,
        AssetsResource, $rootScope) {
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            scope: {
                url: '=?',
                modelData: '='
                //asset: '='
            }, // {} = isolate, true = child, false/undefined = no change
            controller: function ($scope, $element, $attrs, $transclude) {
                console.log($scope.modelData)
                $scope.assets = AssetsResource.query(function () {
                    $timeout(function () {
                        $scope.open = true;
                    }, 2000);
                });
                $scope.asset = {};
                $scope.url = $scope.url || 'service/api/asset';
                $scope.fileReaderSupported = window.FileReader !== null;
                $scope.uploadRightAway = true;
                $scope.hasUploader = function (index) {
                    return $scope.upload[index] !== null;
                };
                $scope.abort = function (index) {
                    $scope.upload[index].abort();
                    $scope.upload[index] = null;
                };
                /*
    $file örneği: 
    lastModifiedDate: Tue Jan 07 2014 22:38:53 GMT+0200 (Türkiye Standart Saati)
    name: "logo.png"
    size: 18515
    type: "image/png"
    webkitRelativePath: ""
*/
                $scope.onClick = function (selectedAsset) {
                    $scope.modelData._asset = $scope.modelData._asset || {};
                    $scope.modelData._asset._id = selectedAsset._id;
                    $scope.modelData._asset.file = selectedAsset.file;
                    console.log($scope.modelData)
                };
                $scope.onFileSelect = function ($files) {
                    $scope.selectedFiles = [];
                    $scope.progress = [];
                    if ($scope.upload && sul > 0) {
                        var sul = $scope.upload.length;
                        var sun = 0;
                        for (sun = 0; sun < sul; sun++) {
                            if ($scope.upload[sun] !== null) {
                                $scope.upload[sun].abort();
                            }
                        }
                    }
                    $scope.upload = [];
                    $scope.uploadResult = [];
                    $scope.selectedFiles = $files;
                    $scope.dataUrls = [];
                    var l = $files.length;
                    var nf = 0;
                    for (; nf < l; nf++) {
                        var $file = $files[nf];
                        $scope.progress[nf] = -1;
                        if ($scope.uploadRightAway) {
                            if (typeof $scope.asset === 'undefined' ||
                                typeof $scope.asset.name === 'undefined') {
                                alert('Dosyaya bir isim vermelisiniz');
                            } else {
                                $scope.start(nf);
                            }
                        }
                    }
                };
                $scope.start = function (index) {
                    $scope.progress[index] = 0;
                    $scope.upload[index] = $upload.upload({
                        url: $scope.url,
                        method: 'POST',
                        data: {
                            name: $scope.asset.name,
                            fileName: slugify($scope.asset.name)
                        },
                        formDataAppender: function (fd, key, val) {
                            if (angular.isArray(val)) {
                                angular.forEach(val, function (v) {
                                    fd.append(key, v);
                                });
                            } else {
                                fd.append(key, val);
                            }
                        },
                        file: $scope.selectedFiles[index],
                        fileFormDataName: 'gorsel'
                    })
                        .then(function (response) {
                            // TODO uploadResults sunucunun cevabı
                            console.log(response);
                        }, null, function (evt) {
                            $scope.progress[index] = parseInt(100.0 *
                                evt.loaded / evt.total);
                            if ($scope.progress[index] == 100) $scope.assets =
                                AssetsResource.query();
                        });
                };
            },
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            templateUrl: 'template/lupus/assets/assets.html',
            // templateUrl: '',
            // replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function ($scope, iElm, iAttrs, controller) {}
        };
    })
    .directive('lupusAssetsAdminDisplayer', function () {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            scope: {
                modelData: '='
            }, // {} = isolate, true = child, false/undefined = no change
            controller: function ($scope, $element, $attrs, $transclude) {
                var isVisualSetted = function () {
                    return !!$scope.modelData._asset && !! $scope.modelData
                        ._asset.file;
                };
                if (isVisualSetted()) $scope.src = $scope.modelData._asset.file;
                $scope.$watch('modelData._asset', function () {
                    if (isVisualSetted()) $scope.src = $scope.modelData
                        ._asset.file || null;
                    else $scope.src = null;
                }, true);
            },
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'template/lupus/assets/admin-displayer.html',
            // replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function ($scope, iElm, iAttrs, controller) {}
        };
    })
    .
directive('lupusAssetsDisplayer', function () {
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        // controller: function($scope, $element, $attrs, $transclude) {},
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: '',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function ($scope, iElm, iAttrs, controller) {}
    };
})
    .directive('egitimBulutuEgitim', function ($timeout) {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            scope: {
                egitim: '=',
                index: '=',
                egitimLength: '='
            }, // {} = isolate, true = child, false/undefined = no change
            // controller: function($scope, $element, $attrs, $transclude) {},
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            template: ' <div class="egitim">{{egitim.name}}</div>',
            // templateUrl: '',
            replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function ($scope, iElm, iAttrs, controller) {
                console.log($scope.egitimLength, $scope.index)
                var poz = 1 / $scope.egitimLength * $scope.index;
                var angle = poz * Math.PI * 2;
                x = Math.cos(angle) * 100 * 10 / $scope.egitimLength;
                y = Math.sin(angle) * 100 * 10 / $scope.egitimLength;

                iElm.css({
                    'top': 120 + y + 'px',
                    'left': 300 + x + 'px'
                });
                //iElm.css('transition', '5s');
            }
        };
    })
    .directive('egitimBulutu', function () {
        // Runs during compile
        // 
        console.log('egitimBulutu')
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            scope: {
                egitimler: '='
            }, // {} = isolate, true = child, false/undefined = no change
            // controller: function($scope, $element, $attrs, $transclude) {},
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'template/akademik-egitim-canvas.html',
            // replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function ($scope, iElm, iAttrs, controller) {
                console.log($scope.egitimler)
                console.log(iElm)
                document.body.onresize = function () {}
            }
        };
    });