(function () {
    'use strict';

    angular
        .module('app', [
            'ngRoute',
            'nba'
        ])
        .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');
            $routeProvider.otherwise({redirectTo: '/nba'});
        }]);
})();
