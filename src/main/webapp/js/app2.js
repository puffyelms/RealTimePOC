
(function() {
// define app, include Wijmo 5 directives
var app = angular.module('app', ['wj']);




// controller
app.controller('appCtrl', function ($scope) {

    // create some random data
    var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
        data = [];
    for (var i = 0; i < countries.length; i++) {
        data.push({
            country: countries[i],
            downloads: Math.round(Math.random() * 20000),
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000
        });
    }

    // expose data as a CollectionView to get events
    $scope.data = new wijmo.collections.CollectionView(data);

    // show grid and restore scroll position
    $scope.toggle = function() {
        var flex = $scope.flex;

        // save scroll position before hiding grid
        if (flex && !$scope.hidden) {
            $scope.sp = flex.scrollPosition;
        }

        // toggle visibility
        $scope.hidden = !$scope.hidden;

        // restore scroll position after showing grid
        // (this is required only in IE...)
        if (flex && !$scope.hidden) {
            setTimeout(function() {
                flex.scrollPosition = $scope.sp;
            }, 0);
        }
    }
});

})();