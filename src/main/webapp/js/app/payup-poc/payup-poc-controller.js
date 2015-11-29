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
            payupCtrl.viewTypeRangeSelected = "";

            payupCtrl.settlementDate = "";

            dataService.getFullPageLoad()
                .then(getFullPageLoadSuccess, null, getNotification)
                .catch(errorCallback)
                .finally(getFullPageLoadComplete);


            // use the "initialized" event to initialize the multiple header rows
            $scope.init = function (s, e) {
                //var flex = panel.grid;
                //flex.beginUpdate();
                //for (var i = 0; i < 3; i++) {
                if (s.columnHeaders.rows.length < 2) {

                    var hr = new wijmo.grid.Row();
                    s.columnHeaders.rows.push(hr);
                }

                // add some data to the column headers
                var colDef = payupCtrl.payupGridColumnsDefinition;

                for (var r = 0; r < s.columnHeaders.rows.length; r++) {
                    if (r==0) {
                        for (var c = 0; c < s.columns.length; c++) {
                            var content = colDef[c].header;// 'r:' + r + ',c:' + c;
                            s.columnHeaders.setCellData(r, c, content);

                        }
                    } if (r==1) {
                        for (var c = 0; c < s.columns.length; c++) {
                            if (c == 0) {
                                s.columnHeaders.setCellData(r, c, "Settlement Date");
                            } else {
                                s.columnHeaders.setCellData(r, c, payupCtrl.settlementDate);
                            }
                        }
                    }


                }
                //flex.endUpdate();
            }

            $scope.itemFormatter = function (panel, r, c, cell) {
                console.log("Called itemFormatter");
                //if (panel.cellType == wijmo.grid.CellType.Cell) {
                //
                //    //if its calculated column
                //    if (r <=3 && c > 0) {
                //        var flex = panel.grid;
                //        flex.beginUpdate();
                //        //get data from other columns for this row i.e. profilt=sales-expenses
                //        //var calculatedData = parseInt(flex.getCellData(r, 1, false)) - parseInt(flex.getCellData(r, 2, false));
                //        //set the value in the calculated column
                //        //cell.innerHTML = "<input type='radio' />";
                //        cell.innerHTML = "<div style='border: solid 1px black;  color: green; background-color: pink;'>"+flex.getCellData(r, c, false)+"</div>";
                //       // flex.setCellData(r, c, calculatedData, true);
                //        flex.endUpdate();
                //    }
                //}


            }


            function getFullPageLoadSuccess(allData) {

                payupCtrl.payupGridColumnsDefinition = allData.gridColumns;
                payupCtrl.payupGridData = new wijmo.collections.CollectionView(allData.gridData);
                payupCtrl.settlementDate = allData.settlementDate;
                payupCtrl.payupGridData.moveCurrentToPosition(-1);  // Clears selection of first cell from table

                payupCtrl.couponList = allData.couponList;
                payupCtrl.couponListMinSelected = allData.minCoupon;
                payupCtrl.couponListMaxSelected = allData.maxCoupon;

                payupCtrl.productGroupList = allData.productGroupList;
                payupCtrl.productGroupSelected = allData.productGroupList[0];

                payupCtrl.viewTypeRangeOptions = allData.viewTypeList;
                payupCtrl.viewTypeRangeSelected = allData.viewType;

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
                dataService.getGridData(payupCtrl.productGroupSelected,  payupCtrl.viewTypeRangeSelected,
                                        payupCtrl.couponListMinSelected, payupCtrl.couponListMaxSelected)
                    .then(getGridDataSuccess, null, getNotification)
                    .catch(errorCallback)
                    .finally(getGridDataComplete);
            };

            function getGridDataSuccess(refreshGridData) {

                console.log("Product Selected=" +  $scope.productGroupSelected );
                payupCtrl.payupGridColumnsDefinition = refreshGridData.gridColumns;
                payupCtrl.payupGridData = new wijmo.collections.CollectionView(refreshGridData.gridData);

                //if (payupCtrl.productGroupSelected == "30/20 YR") {
                //    payupCtrl.payupGridColumnsDefinition = refreshGridData.gridColumns;
                //    payupCtrl.payupGridData = new wijmo.collections.CollectionView(refreshGridData.YR30.gridData);
                //} else if (payupCtrl.productGroupSelected == "15/10 YR") {
                //    payupCtrl.payupGridColumnsDefinition = refreshGridData.gridColumns;
                //    payupCtrl.payupGridData = new wijmo.collections.CollectionView(refreshGridData.YR15.gridData);
                //}
                payupCtrl.payupGridData.moveCurrentToPosition(-1);  // Clears selection of first cell from table

            }

            function getGridDataComplete() {
                console.log('getGridDataComplete has completed');
            }

        });
}());
