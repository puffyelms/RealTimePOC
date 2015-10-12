var initial =  [
    { "month1": 100, "month2" : 100, "month3": 100, "month4" : 100  },
    { "month1": 100, "month2" : 100, "month3": 100, "month4" : 100  },
    { "month1": 100, "month2" : 100, "month3": 100, "month4" : 100  },
    { "month1": 100, "month2" : 100, "month3": 100, "month4" : 100  }
];

var changed =  [
    { "month1": 99,  "month2" : 220, "month3": 800, "month4" : 200  },
    { "month1": 99,  "month2" : 100, "month3": 800, "month4" : 200  },
    { "month1": 99,  "month2" : 220, "month3": 800, "month4" : 200  },
    { "month1": 110, "month2" : 199, "month3": 143, "month4" : 22  }
];

(function (app, ng) {
    'use strict';

    app.controller('AppCtrl', ['$scope', function ($scope) {
        var vm = this;

        $scope.customParams = {};

        $scope.updateCustomRequest = function () {
            vm.productGrid = ng.copy(changed);
            //$scope.customParams.data = data;
            //$scope.customParams.type = type;
            //$scope.customParams.res = res;
            //$scope.sampletext = "input text: " + data;
        };

        vm.productGrid = ng.copy(initial);

        vm.loadData = function loadData() {
            vm.productGrid = ng.copy(changed);
        };

        vm.changeValue = function changeValue() {
            vm.productGrid[0].month1 = 99;
        };

        vm.revert = function revert() {
            vm.productGrid = ng.copy(initial);
        };
    }]);

    app.directive('highlighter', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            scope: {
                model: '=highlighter'
            },
            link: function(scope, element) {
                scope.$watch('model', function (nv, ov) {
                    if (nv > ov) {
                        // apply class
                        element.addClass('highlight-up');

                        // auto remove after some delay
                        $timeout(function () {
                            element.removeClass('highlight-up');
                        }, 1000);
                    } else if (nv < ov) {
                        // apply class
                        element.addClass('highlight-down');

                        // auto remove after some delay
                        $timeout(function () {
                            element.removeClass('highlight-down');
                        }, 1000);
                    }
                });
            }
        };
    }]);
})(angular.module('app', []), angular);


