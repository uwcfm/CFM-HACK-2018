(function() {
    'use strict';
    angular
        .module('nba')
        .factory('nbaService', nbaService);

    nbaService.$inject = ['$http'];

    function nbaService($http) {
        return {
            getTeams: getTeams,
            getPlayers: getPlayers
        };

        function getTeams() {
            var url = '/nba-example/data/teams.json';

            return $http.get(url)
                .then(getTeamsSuccess)
                .catch(getTeamsError);

            function getTeamsSuccess(rsp) {
                return rsp.data;
            }

            function getTeamsError(error) {
                console.log(error);
            }
        }

        function getPlayers() {
            var url = '/nba-example/data/players.json';

            return $http.get(url)
                .then(getPlayersSuccess)
                .catch(getPlayersError);

            function getPlayersSuccess(rsp) {
                return rsp.data;
            }

            function getPlayersError(error) {
                console.log(error);
            }
        }
    }
})();
