(function () {
    'use strict';

    angular
        .module('nba')
        .controller('teamController', teamController);

    teamController.$inject = ['nbaService'];

    function teamController(nbaService) {
        var vm = this;
        init();

        function getTeams() {
            return nbaService.getTeams().then(function(data) {
                return data;
            });
        }

        function init() {
            return getTeams().then(function(data) {
                vm.teams = data;
            });
        }
    }
})();
