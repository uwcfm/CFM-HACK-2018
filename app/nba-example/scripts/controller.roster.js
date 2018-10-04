(function () {
    'use strict';

    angular
        .module('nba')
        .controller('rosterController', rosterController);

    rosterController.$inject = ['nbaService', '$routeParams'];

    function rosterController(nbaService, $routeParams) {
        var vm = this;
        init();

        function getRoster(teamId) {
            return nbaService.getRoster(teamId).then(function(data) {
                return data;
            });
        }

        function getTeamById(teamId) {
            return nbaService.getTeamById(teamId).then(function(data) {
                return data;
            });
        }

        function init() {
            vm.teamId = $routeParams.teamId;
            
            getRoster(vm.teamId).then(function(data) {
                vm.roster = data;
            });

            getTeamById(vm.teamId).then(function(data) {
                vm.team = data;
            });
        }
    }
})();
