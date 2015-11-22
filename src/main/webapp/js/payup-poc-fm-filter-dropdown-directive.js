(function() {
    angular.module('app-wijmo')
        .directive('fmFilterDropdown', function() {
            return {
                scope: {
                    dropdownList : '=',
                    dropdownSelected : '=',
                    dropdownLabel : '@',
                    dropdownWidth : '@dropdownWidth'
                },
                templateUrl: "templates/fmFilterDropdown.html",
                restrict: 'E',
                controller: function($scope) {
                    $scope.dropdownStyleWidth = "";
                    if ($scope.dropdownWidth != null) { // Add dropdown combobox width style
                        $scope.dropdownStyleWidth = "width:" + $scope.dropdownWidth;
                    }
                }
            }

        });
}());