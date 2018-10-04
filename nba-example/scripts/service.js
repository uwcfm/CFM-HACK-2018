(function() {
    'use strict';
    angular
        .module('nba')
        .factory('nbaService', nbaService);

    nbaService.$inject = ['$http'];

    function nbaService($http) {
        return {
            getTeams: getTeams,
            getTeamById: getTeamById,
            getRoster: getRoster,
            getStats: getStats
        };

        function getTeams() {
            var url = '/CFM-HACK-2018/data/teams.json';

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

        function getTeamById(teamId) {
            var url = '/CFM-HACK-2018/data/teams.json';

            return $http.get(url)
                .then(getTeamByIdSuccess)
                .catch(getTeamByIdError);

            function getTeamByIdSuccess(rsp) {
                return rsp.data.find(team => team.teamId == teamId);
            }

            function getTeamByIdError(error) {
                console.log(error);
            }
        }

        function getRoster(teamId) {
            var url = '/CFM-HACK-2018/data/players.json';

            return $http.get(url)
                .then(getRosterSuccess)
                .catch(getRosterError);

            function getRosterSuccess(rsp) {
                return rsp.data.filter(player => player.teamId == teamId);
            }

            function getRosterError(error) {
                console.log(error);
            }
        }

        function getStats() {
            var url = '/CFM-HACK-2018/data/playerStats.json';

            return $http.get(url)
                .then(getStatsSuccess)
                .catch(getStatsError);

            function getStatsSuccess(rsp) {
                let stats = [];
                rsp.data.rowSet.forEach(row => {
                    stats.push(_.object(rsp.data.headers, row));
                })
                
                return stats;
            }

            function getStatsError(error) {
                console.log(error);
            }
        }
    }
})();
