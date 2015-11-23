(function() {
    angular.module('appPayupPoc')
        .controller('appCtrl', function appCtrl($scope, dataService) {

            var payupCtrl = this;

            //Column headers
            payupCtrl.payupGridColumnsDefinition = [];
            payupCtrl.payupGridData = [];

            payupCtrl.productGroupList = [];
            payupCtrl.productGroupSelected = "";

            payupCtrl.couponList = [];
            payupCtrl.couponListMinSelected = "";
            payupCtrl.couponListMaxSelected = "";

            payupCtrl.viewTypeRangeOptions = [];
            payupCtrl.viewTypeRangeSelected = 2;

            dataService.getFullPageLoad()
                .then(getFullPageLoadSuccess, null, getNotification)
                .catch(errorCallback)
                .finally(getFullPageLoadComplete);

            function getFullPageLoadSuccess(allData) {

                payupCtrl.payupGridColumnsDefinition = allData.gridColumns;
                payupCtrl.payupGridData = new wijmo.collections.CollectionView(allData.YR30.gridData);
                payupCtrl.payupGridData.moveCurrentToPosition(-1);  // Clears selection of first cell from table

                payupCtrl.couponList = allData.couponList;
                payupCtrl.couponListMinSelected = allData.minCoupon;
                payupCtrl.couponListMaxSelected = allData.maxCoupon;

                payupCtrl.productGroupList = allData.options;
                payupCtrl.productGroupSelected = allData.options[0];

                payupCtrl.viewTypeRangeOptions = allData.viewTypeList;

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


            payupCtrl.refreshDataClick = function () {
                dataService.getGridData(payupCtrl.productGroupSelected,  payupCtrl.viewTypeRangeOptions[payupCtrl.viewTypeRangeSelected].label,
                                        payupCtrl.couponListMinSelected, payupCtrl.couponListMaxSelected)
                    .then(getGridDataSuccess, null, getNotification)
                    .catch(errorCallback)
                    .finally(getGridDataComplete);
            };

            function getGridDataSuccess(refreshGridData) {

                console.log("Product Selected=" +  $scope.productGroupSelected );
                if (payupCtrl.productGroupSelected == "30/20 YR") {
                    payupCtrl.payupGridColumnsDefinition = refreshGridData.gridColumns;
                    payupCtrl.payupGridData = new wijmo.collections.CollectionView(refreshGridData.YR30.gridData);
                } else if (payupCtrl.productGroupSelected == "15/10 YR") {
                    payupCtrl.payupGridColumnsDefinition = refreshGridData.gridColumns;
                    payupCtrl.payupGridData = new wijmo.collections.CollectionView(refreshGridData.YR15.gridData);
                }
                payupCtrl.payupGridData.moveCurrentToPosition(-1);  // Clears selection of first cell from table

            }

            function getGridDataComplete() {
                console.log('getGridDataComplete has completed');
            }

        });
}());
