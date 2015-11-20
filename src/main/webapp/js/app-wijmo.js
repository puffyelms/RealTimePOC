(function() {

    // declare app module
    var app = angular.module('app-wijmo', ['wj']);


    // app controller provides data
    app.controller('appCtrl2', function appCtrl($scope, dataService) {

        var vm = this;

        vm.selectedTestAccount = null;
        vm.testAccounts = [];


        //DropDown ProductGroup items
        vm.viewableProductGroups = [
            {
                id: 1,
                name: "Loading..."
            }
        ];
        vm.selectedProductGroup = null;

        vm.couponMinimums = [{
            id: 1,
            name: "Loading..."
        }];
        vm.selectedCouponMinimum = null;

        vm.couponMaximums = [{
            id: 1,
            name: "Loading..."
        }];
        vm.selectedCouponMaximum = null;



        dataService.getPayupGridTotalDefault()
            .then(getPayupGridTotalDefaultSuccess, null, getNotification)
            .catch(errorCallback)
            .finally(getPayupGridTotalDefaultComplete);

        function getPayupGridTotalDefaultSuccess(allData) {
            $scope.data = new wijmo.collections.CollectionView(allData.gridData);
            $scope.isDisabled = false;

            vm.couponMinimums = allData.couponList;
            vm.selectedCouponMinimum = 2;
            //$scope.doSelect(2);

            vm.couponMaximums = allData.couponList;
            vm.selectedCouponMaximum = 4;

            vm.testAccounts =  allData.couponList;
            vm.selectedTestAccount = 1.5;

            vm.viewableProductGroups = allData.options;
            vm.selectedProductGroup = 1;
        }

        function getGridDataSuccess(gridData) {
            $scope.data = new wijmo.collections.CollectionView(gridData);
            $scope.isDisabled = false;
            //$scope.$apply('data');
        }

        function getNotification(notification) {
            console.log('Promise Notifcation:' + notification);
        }

        function getPayupGridTotalDefaultComplete() {
            console.log('getPayupGridTotalDefault has completed');
        }

        function getGridDataComplete() {
            console.log('getGridData has completed');
        }

        function errorCallback(errorMsg) {
            console.log('Error message:' + errorMsg);
        }



        //Column headers
        $scope.payupGridColumnDefinition = [
            {
                header: 'Coupon',
                binding: 'country'
            },
            {
                header: '2.0',
                binding: 'sales'
            }
        ];
        var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
            data = [];
        //Just make it so the grid isn't empty before the data comes back;
        //for (var i = 0; i < 1; i++) {
            data.push({
                country: "Loading...",
                downloads: 0,
                sales: 0,
                expenses: 0
            });
        //}

        //$scope.init = function (s, e) {
        //    //initializeColumns(s);
        //
        //    //for (var i = 0; i < 1; i++) {
        //    var hr = new wijmo.grid.Row();
        //    s.columnHeaders.rows.push(hr);
        //    //}
        //
        //}

        //// initialize the columns on a FlexGrid
        //function initializeColumns(flex) {
        //    flex.initializ({
        //        columns: [
        //            {binding: 'country', header: 'Country'},
        //            {binding: 'sales', header: 'Sales'},
        //            {binding: 'expenses', header: 'Expenses'},
        //            {binding: 'downloads', header: 'Downloads'}
        //        ]
        //    });
        //}

        $scope.isDisabled = false;

        $scope.refreshDataClick = function () {
            $scope.isDisabled = true;
            dataService.getGridData()
                .then(getGridDataSuccess, null, getNotification)
                .catch(errorCallback)
                .finally(getGridDataComplete);
        };

        $scope.updateMinCoupon = function() {
            console.log("coupon min is now: "+vm.selectedTestAccount);
        }

        // expose data as a CollectionView to get events
        $scope.data = new wijmo.collections.CollectionView(data);
    });



}());