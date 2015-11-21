(function() {

    // declare app module
    angular.module('app-wijmo2', ['wj']);


    // app controller provides data
    angular.module('app-wijmo2')
        .controller('appCtrl3', function appCtrl($scope, dataService) {

            //Column headers
            $scope.payupGridColumnsDefinition = [];
            $scope.payupGridData = [];

            $scope.productGroupList = [];
            $scope.productGroupSelected = "";

            $scope.couponList = [];
            $scope.couponListMinSelected = "";
            $scope.couponListMaxSelected = "";

            dataService.getPayupGridTotalDefault()
                .then(getPayupGridTotalDefaultSuccess, null, getNotification)
                .catch(errorCallback)
                .finally(getPayupGridTotalDefaultComplete);

            function getPayupGridTotalDefaultSuccess(allData) {

                $scope.payupGridColumnsDefinition = allData.gridColumns;
                $scope.payupGridData = new wijmo.collections.CollectionView(allData.gridData);
                $scope.payupGridData.moveCurrentToPosition(-1);  // Clears selection of first cell from table

                $scope.couponList = allData.smallCouponList;
                $scope.couponListMinSelected = allData.minCoupon;
                $scope.couponListMaxSelected = allData.maxCoupon;

                $scope.productGroupList = allData.options;
                $scope.productGroupSelected = allData.options[0];

            }
            function getNotification(notification) {
                console.log('Promise Notifcation:' + notification);
            }

            function getPayupGridTotalDefaultComplete() {
                console.log('getPayupGridTotalDefault has completed');
                //$scope.couponMinSelected = allData.couponList[0].name;
            }

            function errorCallback(errorMsg) {
                console.log('Error message:' + errorMsg);
            }


            $scope.refreshDataClick = function () {
                dataService.getGridData()
                    .then(getGridDataSuccess, null, getNotification)
                    .catch(errorCallback)
                    .finally(getGridDataComplete);
            };

            function getGridDataSuccess(refreshGridData) {

                $scope.payupGridColumnsDefinition = refreshGridData.gridColumns;
                $scope.payupGridData = new wijmo.collections.CollectionView(refreshGridData.gridData);
                $scope.payupGridData.moveCurrentToPosition(-1);  // Clears selection of first cell from table

                //$scope.$apply('data');
            }

            function getGridDataComplete() {
                console.log('getGridDataComplete has completed');
                //$scope.couponMinSelected = allData.couponList[0].name;
            }



            // handle menu clicks: this method gets invoked when the menu's itemClicked event fires
            //$scope.menuItemClicked = function (sender, args) {
            //    var menu = sender;
            //    alert('Thanks for selecting option ' + menu.selectedIndex + ' from menu **' + menu.header + '**!');
            //}



            //$scope.updateMinCoupon = function() {
            //    $scope.couponMinSelected = 1.0;
            //    console.log("coupon min is now: "+$scope.couponMinSelected);
            //}
    });



}());