(function() {


    // declare app module
    var app = angular.module('app-wijmo2', ['wj'])
        .factory('dataService',['$q', '$timeout', '$http', dataService]);

    function dataService($q, $timeout, $http) {
        return {
            getAllBooks: getAllBooks,
            getCouponList: getCouponList,
            getGridData: getGridData
        };

        function getGridData() {

            return $http({
                method: 'GET',
                url: 'http://localhost:3000/gridData',
                headers: {
                    'PS-DataLogger-Version': '1.01'
                }
            })
                .then(sendGridResponseData)
                .catch(sendGridDataError);
        }

        function sendGridResponseData(response) {
            console.log("Loading Grid Data");

            return response.data;
        }

        function getAllBooks() {

            return $http({
                method: 'GET',
                url: 'http://localhost:3000/profile',
                headers: {
                    'PS-BookLogger-Version': '1.01'
                }
            })
            .then(sendResponseData)
            .catch(sendGetBooksError);
        }

        function getCouponList() {

            return $http({
                method: 'GET',
                url: 'http://localhost:3000/couponList',
                headers: {
                    'PS-CouponLogger-Version': '1.01'
                }
            })
            .then(sendResponseData)
            .catch(sendCouponListError);
        }


        function sendResponseData(response) {
            return response.data;
        }

        function sendGetBooksError(response) {
            return $q.reject('Error retrieving books(s). (HTTP status: ' +response.status + ')' );
        }
        function sendCouponListError(response) {
            return $q.reject('Error retrieving coupon list. (HTTP status: ' +response.status + ')' );
        }
        function sendGridDataError(response) {
            return $q.reject('Error retrieving grid data. (HTTP status: ' +response.status + ')' );
        }
    };


    app.provider('books', function () {
        this.$get = function () {
            var appName = 'Book Logger';
            var appDesc = 'Track which books you read';
            var version = "1.0";

            if (includeVersionInTitle) {
                appName += ' ' + version;
            }
            return {
                appName: appName,
                appDesc: appDesc
            };
        };

        var includeVersionInTitle = false;
        this.setIncludeVersionInTitle = function(value) {
            includeVersionInTitle = value;
        }

    });

    app.config(function (booksProvider) {

        booksProvider.setIncludeVersionInTitle(true);

    });

    // app controller provides data
    app.controller('appCtrl2', function appCtrl($scope, books, dataService) {

        var vm = this;
        vm.appName = books.appName;

        vm.couponMinimums = {};
        vm.selectedCouponMinimum = 0;

        dataService.getAllBooks()
            .then(getBooksSuccess, null, getBooksNotification)
            .catch(errorCallback)
            .finally(getAllBooksComplete);

        dataService.getGridData()
            .then(getGridDataSuccess, null, getGridDataNotification)
            .catch(errorCallback)
            .finally(getGridDataComplete);


        function getGridDataSuccess(gridData) {
            //throw 'error in success handler';
            $scope.data = new wijmo.collections.CollectionView(gridData);
            //$scope.$apply('data');

            //var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
                //data = [];

            //for (var i = 0; i < countries.length; i++) {
            //    data.push({
            //        country: countries[i],
            //        downloads: Math.round(Math.random() * 20000),
            //        sales: Math.random() * 10000,
            //        expenses: Math.random() * 5000
            //    });
            //}

            //vm.allBooks = books;
        }

        function getGridDataNotification(notification) {
            console.log('Promise Notifcation:' + notification);
        }

        function getGridDataComplete() {
            console.log('getGridData has completed');
        }




        function getBooksSuccess(books) {
            //throw 'error in success handler';
            console.log("getBooksSuccess!!");
            vm.allBooks = books;
        }

        function getBooksNotification(notification) {
            console.log('Promise Notifcation:' + notification);
        }

        function errorCallback(errorMsg) {
            console.log('Error message:' + errorMsg);
        }

        function getAllBooksComplete() {
            console.log('getAllBooks has completed');
        }

        dataService.getCouponList()
            .then(getCouponListSuccess, null, getCouponListNotification)
            .catch(errorCallback)
            .finally(getCouponListComplete);

        function getCouponListSuccess(coupons) {
            //throw 'error in success handler';
            console.log('Promise success:' + coupons);
            vm.couponMinimums = coupons;
            vm.selectedCouponMinimum = 1;
        }

        function getCouponListNotification(notification) {
            console.log('Promise Notifcation:' + notification);
        }

        function getCouponListComplete() {
            console.log('getCouponListComplete has completed');
        }

        // generate some random data
        //var data = getData(10000);
        //$scope.data = new wijmo.collections.CollectionView(data);
        //
        //
        //// build list of columns available
        //var item = data[0],
        //    fields = new wijmo.collections.ObservableArray();
        //for (var key in item) {
        //    fields.push(key);
        //}
        //$scope.columnsAvailable = new wijmo.collections.CollectionView(fields);

        //DropDown ProductGroup items
        $scope.viewableProductGroups = [{
            id: 1,
            name: "30/20 YR"
        }, {
            id: 2,
            name: "15/10 YR"
        }];
        $scope.selectedProductGroup = 1;

       vm.couponMinimums = [{
            id: 1,
            name: "Loading..."
        }];
        vm.selectedCouponMinimum = 1;

        $scope.couponMaximums = [{
            id: 1,
            name: "1.0"
        }, {
            id: 2,
            name: "1.5"
        }, {
            id: 3,
            name: "2.0"
        }, {
            id: 4,
            name: "2.5"
        }, {
            id: 5,
            name: "3.0"
        }, {
            id: 6,
            name: "3.5"
        }, {
            id: 7,
            name: "4.0"
        }, {
            id: 8,
            name: "4.5"
        }, {
            id: 9,
            name: "5.0"
        }];
        $scope.selectedCouponMaximum = 1;

        //Column headers
        $scope.statisticsColumns = [
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
        for (var i = 0; i < 1; i++) {
            data.push({
                country: "Loading...",
                downloads: 0,
                sales: 0,
                expenses: 0
            });
        }

        $scope.init = function (s, e) {
            //initializeColumns(s);

            //for (var i = 0; i < 1; i++) {
            var hr = new wijmo.grid.Row();
            s.columnHeaders.rows.push(hr);
            //}

        }

        // initialize the columns on a FlexGrid
        function initializeColumns(flex) {
            flex.initializ({
                columns: [
                    {binding: 'country', header: 'Country'},
                    {binding: 'sales', header: 'Sales'},
                    {binding: 'expenses', header: 'Expenses'},
                    {binding: 'downloads', header: 'Downloads'}
                ]
            });
        }

        // add data array to scope
        //$scope.data = data;

        // expose data as a CollectionView to get events
        $scope.data = new wijmo.collections.CollectionView(data);
    });


    app.directive('bsDropdown', function ($compile) {
        return {
            restrict: 'E',
            scope: {
                items: '=dropdownData',
                doSelect: '&selectVal',
                selectedItem: '=preselectedItem'
            },
            link: function (scope, element, attrs) {
                var html = '';
                switch (attrs.menuType) {
                    case "button":
                        html += '<div class="btn-group"><button class="btn button-label btn-primary">Action</button><button class="btn btn-primary dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button>';
                        break;
                    default:
                        html += '<div class="dropdown"><a class="dropdown-toggle" role="button" data-toggle="dropdown"  href="javascript:;">Dropdown<b class="caret"></b></a>';
                        break;
                }
                html += '<ul class="dropdown-menu"><li ng-repeat="item in items"><a tabindex="-1" data-ng-click="selectVal(item)">{{item.name}}</a></li></ul></div>';
                element.append($compile(html)(scope));
                for (var i = 0; i < scope.items.length; i++) {
                    if (scope.items[i].id === scope.selectedItem) {
                        scope.bSelectedItem = scope.items[i];
                        break;
                    }
                }
                scope.selectVal = function (item) {
                    switch (attrs.menuType) {
                        case "button":
                            $('button.button-label', element).html(item.name);
                            break;
                        default:
                            $('a.dropdown-toggle', element).html('<b class="caret"></b> ' + item.name);
                            break;
                    }
                    scope.doSelect({
                        selectedVal: item.id
                    });
                };
                scope.selectVal(scope.bSelectedItem);
            }
        };
    });
}());