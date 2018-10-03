(function () {
    'use strict';

    angular
        .module('nba', ['ngRoute'])
        .config(function($routeProvider) {
            $routeProvider
            .when('/nba', {
                templateUrl : 'nba-example/index.html',
				controller  : 'mainController',
                controllerAs: 'vm'
            })
           .when('/nba/teams', {
                templateUrl : 'nba-example/views/teams.html',
			    controller  : 'teamController',
                controllerAs: 'vm'
           });
        });
})();
