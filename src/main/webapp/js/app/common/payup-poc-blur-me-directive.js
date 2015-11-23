(function() {
    angular.module('appPayupPoc')
        .directive('fmBlurMe', function() {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    element.bind('click', function () {
                        element.blur();
                    });
                }
            };
        });
}());