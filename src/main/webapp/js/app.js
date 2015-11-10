var initial = {};
initial['2.5'] = {
    "coupon": 2.5, cellMonth1: {"currentPrice": 100, "cobPrice": 115},
    cellMonth2: {"currentPrice": 100, "cobPrice": 115},
    cellMonth3: {"currentPrice": 100, "cobPrice": 115},
    cellMonth4: {"currentPrice": 100, "cobPrice": 115}
};
initial['3.0'] = {
    "coupon": 3.0, cellMonth1: {"currentPrice": 100, "cobPrice": 115},
    cellMonth2: {"currentPrice": 100, "cobPrice": 115},
    cellMonth3: {"currentPrice": 100, "cobPrice": 115},
    cellMonth4: {"currentPrice": 100, "cobPrice": 115}
};
initial['3.5'] = {
    "coupon": 3.5, cellMonth1: {"currentPrice": 101, "cobPrice": 115},
    cellMonth2: {"currentPrice": 100, "cobPrice": 115},
    cellMonth3: {"currentPrice": 100, "cobPrice": 115},
    cellMonth4: {"currentPrice": 100, "cobPrice": 115}
};
initial['4.0'] = {
    "coupon": 4.0, cellMonth1: {"currentPrice": 100, "cobPrice": 115},
    cellMonth2: {"currentPrice": 100, "cobPrice": 115},
    cellMonth3: {"currentPrice": 100, "cobPrice": 115},
    cellMonth4: {"currentPrice": 100, "cobPrice": 115}
};
initial['4.5'] = {
    "coupon": 4.5, cellMonth1: {"currentPrice": 100, "cobPrice": 115},
    cellMonth2: {"currentPrice": 100, "cobPrice": 115},
    cellMonth3: {"currentPrice": 100, "cobPrice": 115},
    cellMonth4: {"currentPrice": 100, "cobPrice": 115}
};
initial['5.0'] = {
    "coupon": 5.0, cellMonth1: {"currentPrice": 100, "cobPrice": 115},
    cellMonth2: {"currentPrice": 100, "cobPrice": 115},
    cellMonth3: {"currentPrice": 100, "cobPrice": 115},
    cellMonth4: {"currentPrice": 100, "cobPrice": 115}
};
initial['5.5'] = {
    "coupon": 5.5, cellMonth1: {"currentPrice": 100, "cobPrice": 115},
    cellMonth2: {"currentPrice": 100, "cobPrice": 115},
    cellMonth3: {"currentPrice": 100, "cobPrice": 115},
    cellMonth4: {"currentPrice": 100, "cobPrice": 115}
};


var changed = {};
changed['2.5'] = {
    "coupon": 2.5, cellMonth1: {"currentPrice": 99, "cobPrice": 115},
    cellMonth2: {"currentPrice": 99, "cobPrice": 115},
    cellMonth3: {"currentPrice": 99, "cobPrice": 115},
    cellMonth4: {"currentPrice": 99, "cobPrice": 115}
};
changed['3.0'] = {
    "coupon": 3.0, cellMonth1: {"currentPrice": 99, "cobPrice": 115},
    cellMonth2: {"currentPrice": 99, "cobPrice": 115},
    cellMonth3: {"currentPrice": 99, "cobPrice": 115},
    cellMonth4: {"currentPrice": 99, "cobPrice": 115}
};
changed['3.5'] = {
    "coupon": 3.5, cellMonth1: {"currentPrice": 101, "cobPrice": 115},
    cellMonth2: {"currentPrice": 99, "cobPrice": 115},
    cellMonth3: {"currentPrice": 99, "cobPrice": 115},
    cellMonth4: {"currentPrice": 99, "cobPrice": 115}
};
changed['4.0'] = {
    "coupon": 4.0, cellMonth1: {"currentPrice": 99, "cobPrice": 115},
    cellMonth2: {"currentPrice": 99, "cobPrice": 115},
    cellMonth3: {"currentPrice": 99, "cobPrice": 115},
    cellMonth4: {"currentPrice": 99, "cobPrice": 115}
};
changed['4.5'] = {
    "coupon": 4.5, cellMonth1: {"currentPrice": 99, "cobPrice": 115},
    cellMonth2: {"currentPrice": 99, "cobPrice": 115},
    cellMonth3: {"currentPrice": 99, "cobPrice": 115},
    cellMonth4: {"currentPrice": 99, "cobPrice": 115}
};
changed['5.0'] = {
    "coupon": 5.0, cellMonth1: {"currentPrice": 99, "cobPrice": 115},
    cellMonth2: {"currentPrice": 99, "cobPrice": 115},
    cellMonth3: {"currentPrice": 99, "cobPrice": 115},
    cellMonth4: {"currentPrice": 99, "cobPrice": 115}
};
changed['5.5'] = {
    "coupon": 5.5, cellMonth1: {"currentPrice": 99, "cobPrice": 115},
    cellMonth2: {"currentPrice": 99, "cobPrice": 115},
    cellMonth3: {"currentPrice": 99, "cobPrice": 115},
    cellMonth4: {"currentPrice": 99, "cobPrice": 115}
};


var app = angular.module('app', []);

app.controller('AppCtrl', function ($scope) {
    var vm = this;

    $scope.stagedProductGrid = {};
    $scope.customParams = {};

    $scope.setStagedProductData = function (data2) {
        $scope.stagedProductGrid = data2;
    }

    //Called from websockets.
    $scope.updateStagedData = function () {
        var newData2 = $scope.stagedProductGrid;
        for (var key in newData2) {
            var couponCell = newData2[key];

            var couponToModify = vm.productGrid[couponCell.coupon];
            couponToModify.cellMonth1.currentPrice = couponCell.month1;
            couponToModify.cellMonth2.currentPrice = couponCell.month2;
            couponToModify.cellMonth3.currentPrice = couponCell.month3;
            couponToModify.cellMonth4.currentPrice = couponCell.month4;
        }
    };

    vm.productGrid = angular.copy(initial);

    vm.loadData = function loadData() {
        vm.productGrid = angular.copy(changed);
    };

    vm.changeValue = function changeValue() {
        vm.productGrid[0].month1 = 99;
    };

    vm.revert = function revert() {
        vm.productGrid = angular.copy(initial);
    };
});

app.directive('highlighter', function ($timeout) {
    return {
        restrict: 'A',
        scope: {
            model: '=highlighter'
        },
        link: function (scope, element) {
            scope.$watch(
                'model',
                function (newVal, oldVal) {


                    if (newVal.currentPrice > newVal.cobPrice) {
                        element.addClass('highlight-cob-up');
                        element.removeClass('highlight-cob-down');
                    } else if (newVal.currentPrice < newVal.cobPrice) {
                        element.addClass('highlight-cob-down');
                        element.removeClass('highlight-cob-up');
                    } else {
                        element.removeClass('highlight-cob-up');
                        element.removeClass('highlight-cob-down');
                    }

                    if (newVal.currentPrice > oldVal.currentPrice) {
                        // apply class
                        //$('#lblName').closest('tr').index();
                        element.addClass('highlight-up');

                        // auto remove after some delay
                        $timeout(function () {
                            element.removeClass('highlight-up');
                        }, 2000);
                    } else if (newVal.currentPrice < oldVal.currentPrice) {
                        // apply class
                        element.addClass('highlight-down');

                        // auto remove after some delay
                        $timeout(function () {
                            element.removeClass('highlight-down');
                        }, 2000);
                    }

                }, true
            );
        }
    };
});



