var initial =  [
    { "month1": 100, "month2" : 100, "month3": 100, "month4" : 100  },
    { "month1": 100, "month2" : 100, "month3": 100, "month4" : 100  },
    { "month1": 100, "month2" : 100, "month3": 100, "month4" : 100  },
    { "month1": 100, "month2" : 100, "month3": 100, "month4" : 100  }
];

var changed =  [
    { "month1": 1,  "month2" : 2200, "month3": 1, "month4" : 200  },
    { "month1": 1,  "month2" : 1000, "month3": 8200, "month4" : 200  },
    { "month1": 1,  "month2" : 2200, "month3": 10, "month4" : 200  },
    { "month1": 1, "month2" : 1990, "month3": 11, "month4" : 1111  }
];

(function (app, ng) {
    'use strict';

    app.controller('AppCtrl', ['$scope', function ($scope) {
        var vm = this;

        $scope.stagedProductGrid = {};
        $scope.customParams = {};

        $scope.setStagedProductData = function(data2) {
            $scope.stagedProductGrid = data2;
        }

        //Called from websockets.
        $scope.updateStagedData = function () {
            vm.productGrid = $scope.stagedProductGrid;
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


