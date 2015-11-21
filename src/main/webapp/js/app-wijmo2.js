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

            dataService.getFullPageLoad()
                .then(getFullPageLoadSuccess, null, getNotification)
                .catch(errorCallback)
                .finally(getFullPageLoadComplete);

            function getFullPageLoadSuccess(allData) {

                $scope.payupGridColumnsDefinition = allData.gridColumns;
                $scope.payupGridData = new wijmo.collections.CollectionView(allData.gridData);
                $scope.payupGridData.moveCurrentToPosition(-1);  // Clears selection of first cell from table

                $scope.couponList = allData.couponList;
                $scope.couponListMinSelected = allData.minCoupon;
                $scope.couponListMaxSelected = allData.maxCoupon;

                $scope.productGroupList = allData.options;
                $scope.productGroupSelected = allData.options[0];

            }
            function getNotification(notification) {
                console.log('Promise Notifcation:' + notification);
            }

            function getFullPageLoadComplete() {
                console.log('getFullPageLoadComplete has completed');
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
            }

    });
/*

Try this first:
https://siddii.github.io/angular-timer/examples.html#/angularjs-polling-timer-source
 http://plnkr.co/edit/4es4Sz?p=preview

 You should be calling the tick function in the callback for query.

 function dataCtrl($scope, $timeout, Data) {
 $scope.data = [];

 (function tick() {
 $scope.data = Data.query(function(){
 $timeout(tick, 1000);
 });
 })();
 };
 */


}());