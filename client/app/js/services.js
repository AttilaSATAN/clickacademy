/*globals angular:true, console:true*/
/* Services */
angular.module('lupusshow.services', [])
    .factory('BildirimlerSrvc', ['$alert',
        function ($alert) {
            "use strict";
            var bildirimler = {
                bildirim: function (data) {
                    $alert(data);
                },
                info: function (msg) {
                    var data = {
                        //duration: 5,
                        animation: 'am-fadeAndSlideTop',
                        title: 'Bilgilendirme: ',
                        content: msg,
                        placement: 'top-left',
                        type: 'info',
                        show: true
                    };
                    this.bildirim(data);
                },
                warning: function (msg) {
                    var data = {
                        //duration: 5,
                        animation: 'am-fadeAndSlideTop',
                        title: 'Uyarı: ',
                        content: msg,
                        placement: 'top-left',
                        type: 'warning',
                        show: true
                    };
                    this.bildirim(data);
                },
                success: function (msg) {
                    var data = {
                        //duration: 5,
                        animation: 'am-fadeAndSlideTop',
                        title: 'Tebrikler: ',
                        content: msg,
                        placement: 'top-left',
                        type: 'success',
                        show: true
                    };
                    this.bildirim(data);
                },
                danger: function (msg) {
                    var data = {
                        //duration: 5,
                        animation: 'am-fadeAndSlideTop',
                        title: 'Dikkat: ',
                        content: msg,
                        placement: 'top-left',
                        type: 'danger',
                        show: true
                    };
                    this.bildirim(data);
                }
            };
            return bildirimler;
        }
    ])
    .factory('slugify', function () {
        return function (text) {
            if (!text) return null;
            var trMap = {
                'çÇ': 'c',
                'ğĞ': 'g',
                'şŞ': 's',
                'üÜ': 'u',
                'ıİ': 'i',
                'öÖ': 'o'
            };
            for (var key in trMap) {
                text = text.replace(new RegExp('[' + key + ']', 'g'), trMap[
                    key]);
            }
            return text.replace(/[^-a-zA-Z0-9\s]+/ig, '') // remove non-alphanumeric chars
            .replace(/\s/gi, "-") // convert spaces to dashes
            .replace(/[-]+/gi, "-") // trim repeated dashes
            .toLowerCase();
        };
    })
    .factory('StateResource', function ($resource) {
        return $resource('http://lupus-2.dev/service/api/states', {}, {});
    })
    .factory('TemplatesResource', function ($resource) {
        return $resource('http://lupus-2.dev/service/api/templates', {}, {
            query: {
                method: 'GET',
                isArray: true
            },
            create: {
                method: 'POST'
            }
        });
    })
    .factory('TemplateResource', function ($resource) {
        return $resource('http://lupus-2.dev/service/api/templates', {}, {
            create: {
                method: 'POST'
            }
        });
    })
    .factory('PartialsResource', function ($resource) {
        return $resource('http://lupus-2.dev/service/api/partials');
    })
    .factory('EgitimCategoriesResource', function ($resource) {
        return $resource('http://lupus-2.dev/service/api/egitim-categories');
    })
    .factory('EgitimCategoryResource', function ($resource) {
        return $resource('http://lupus-2.dev/service/api/egitim-category/:categoryId', 
            {categoryId:'@id'});
    })
    .factory('EgitimlerResource', function ($resource) {
        return $resource('http://lupus-2.dev/service/api/egitimler');
    })
    .factory('EgitimResource', function ($resource) {
        return $resource('http://lupus-2.dev/service/api/egitim/:egitimId', 
            {egitimId:'@id'});
    })
    .factory('EgitimByCategoryResource', function($resource){
        return $resource('http://lupus-2.dev/service/api/egitim/by-category/:categoryUrl', 
            {categoryUrl:'@categoryUrl'}, 
            {'get': {
                isArray: true
            }});
    })
    .factory('EgitimByUrlResource', function($resource){
        return $resource('http://lupus-2.dev/service/api/egitim/by-url/:egitimUrl', 
            {egitimUrl:'@url'});
    })
    .factory('ProgramResource', function ($resource) {
        return $resource('http://lupus-2.dev/service/api/program');
    })
    .factory('MeslekiResource', function ($resource) {
        return $resource('http://lupus-2.dev/service/api/mesleki');
    })
    .factory('SektorelResource', function ($resource) {
        return $resource('http://lupus-2.dev/service/api/sektorel');
    });