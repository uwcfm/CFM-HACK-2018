(function () {
    'use strict';

    angular
        .module('nba')
        .controller('mainController', mainController);

    function mainController() {
        var vm = this;
        init();

        function init() {
            vm.year = 2018;
            vm.title = "NBA Data Explorer";
        }
    }
})();
