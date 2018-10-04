(function () {
    'use strict';

    angular
        .module('app', [
            'ngRoute',
            'nba'
        ])
        .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');
            $routeProvider
            .when('/', {
                templateUrl : 'event/index.html',
				controller  : 'eventController',
                controllerAs: 'vm'
            })
            .otherwise({redirectTo: '/'});
        }]);
})();
