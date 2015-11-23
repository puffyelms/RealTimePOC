(function() {
    angular.module('appPayupPoc')
        .directive('fmButtonGroup', function() {
            return {
                replace: true,
                scope: { type:'@fmButtonGroup', rangeSelected:'=', options:'=' },
                templateUrl:'templates/fm-group-button-template.html',
                controller: function ($scope,$element,$attrs) {
                    $scope.activate = function (option) {
                        $scope.rangeSelected = option;
                        console.log("button clicked: " + option);
                    };
                }
            };
        });
}());