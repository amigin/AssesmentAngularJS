(function () {
    'use strict';
    function config($locationProvider) {
        $locationProvider.html5Mode(true);
    }
    angular
        .module('app')
        .config(config);
    config.$inject = ['$locationProvider'];
})();
