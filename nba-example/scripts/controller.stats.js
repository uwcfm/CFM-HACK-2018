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
                                x: player.MIN,
                                y: player.PTS,
                                name: player.PLAYER_NAME
                            }
                        })
                    }]
                },
                options: {
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                let name = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].name;
                                return name + " scores " + Number(tooltipItem.yLabel) + " points in " + Number(tooltipItem.xLabel) + " mins";
                            }
                        }
                    },
                    scales: {
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Minutes Played'
                            },
                            type: 'linear',
                            position: 'bottom'
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Points'
                            }
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
