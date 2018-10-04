(function () {
    'use strict';

    angular
        .module('nba')
        .controller('statsController', statsController);

        statsController.$inject = ['nbaService'];

    function statsController(nbaService) {
        var vm = this;
        init().then(function() {
            var ctx = document.getElementById("myChart");
            var scatterChart = new Chart(ctx, {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: 'Points vs Minutes Played',
                        data: vm.players.map(player => {
                            return {
                                x: player.Time,
                                y: player.PPG
                            }
                        })
                    }]
                },
                options: {
                    scales: {
                        xAxes: [{
                            type: 'linear',
                            position: 'bottom'
                        }]
                    }
                }
            });
        });

        function getStats(teamId) {
            return nbaService.getStats().then(function(data) {
                return data;
            });
        }

        function init() {
            return getStats().then(function(data) {
                vm.players = data;
            });
        }
    }
})();
