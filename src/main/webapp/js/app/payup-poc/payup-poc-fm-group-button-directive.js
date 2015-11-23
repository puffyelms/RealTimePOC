(function() {
    angular.module('appPayupPoc')
        .directive('fmButtonGroup', function() {
            return {
                replace: true,
                scope: { type:'@fmButtonGroup', model:'=', options:'=' },
                templateUrl:'templates/range.tpl.html',
                controller: function ($scope,$element,$attrs) {
                    $scope.activate = function (option) {
                        console.log("button clicked: " + option);
                    };
                }
            };
        });
}());