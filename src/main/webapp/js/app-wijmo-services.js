(function() {

    //app.factory('dataService',['$q', '$timeout', '$http', dataService]);
    angular.module('app-wijmo')
        .factory('dataService',['$q', '$timeout', '$http', dataService]);

    function dataService($q, $timeout, $http) {
        return {
            getPayupGridTotalDefault: getPayupGridTotalDefault,
            getCouponList: getCouponList,
            getGridData: getGridData
        };


        function getPayupGridTotalDefault() {

            return $http({
                method: 'GET',
                url: 'http://localhost:3000/filterValues',
                headers: {
                    'PS-DataLogger-Version': '1.01'
                }
            })
                .then(sendPayupGridTotalDefaultResponseData)
                .catch(sendPayupGridTotalDefaultError);
        }

        function sendPayupGridTotalDefaultResponseData(response) {
            console.log("Loading Grid Data");

            return response.data;
        }



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


        function getCouponList() {

            return $http({
                method: 'GET',
                url: 'http://localhost:3000/filterValues',
                headers: {
                    'PS-CouponLogger-Version': '1.01'
                }
            })
                .then(sendCouponListResponseData)
                .catch(sendCouponListError);
        }
        function sendCouponListResponseData(response) {
            console.log("response.data.getCouponList="+response.data.couponList);
            return response.data.couponList;
        }

        function sendResponseData(response) {
            return response.data;
        }

        function sendPayupGridTotalDefaultError(response) {
            return $q.reject('Error retrieving coupon list. (HTTP status: ' + response.status + ')');
        }
        function sendCouponListError(response) {
            return $q.reject('Error retrieving coupon list. (HTTP status: ' +response.status + ')' );
        }
        function sendGridDataError(response) {
            return $q.reject('Error retrieving grid data. (HTTP status: ' +response.status + ')' );
        }
    };


}());