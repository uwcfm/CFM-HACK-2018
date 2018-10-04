(function () {
    'use strict';

    angular
        .module('app')
        .controller('eventController', eventController);

    function eventController() {
        var vm = this;
        init();

        function init() {
            vm.event = {
                title: "CFM Hack 2018",
                timeBegin: "6:00pm Oct 26, 2018",
                timeEnd: "10:00am Oct 29, 2018",
                judges: "CFM mentors, Yi, and Heather",
                participants: "CFM 1st year students",
                location: "TBD",
                detail: "It is a voluntary event. Students will be divided into groups, each group will be given a set of financial data along with a set of questions that they need to analyze and answer. Students will be designing web page based on the data given. Web page should at least include information regarding their financial analysis, each group member's profile and resume, graphs & charts.",
                submission: "submit to github branches before 10:00am Oct 29, 2018",
                rule: "In this year's hackathon, you will be developing a client frontend application using AngularJS. Each student will clone the starter repository and create a new branch from the repository. To submit your code, you need to push your latest code to the branch before the deadline. If you commit new changes after the deadline, you will be disqualified from the awards.",
                reminder: "Bring your own laptops and chargers"
            }
        }
    }
})();
