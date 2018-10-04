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
                templateUrl : 'nba-example/views/team.html',
			    controller  : 'teamController',
                controllerAs: 'vm'
            })
            .when('/nba/teams/:teamId', {
                templateUrl : 'nba-example/views/roster.html',
                controller  : 'rosterController',
                controllerAs: 'vm'
            })
            .when('/nba/stats', {
                templateUrl : 'nba-example/views/stats.html',
                controller  : 'statsController',
                controllerAs: 'vm'
            });
        });
})();
