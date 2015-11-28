(function() {
    angular.module('appPayupPoc')
        .factory('dataService',['$q', '$timeout', '$http', dataService]);

    function dataService($q, $timeout, $http) {
        return {
            getFullPageLoad: getFullPageLoad,
            getGridData : getGridData
        };


        function getFullPageLoad() {

            return $http({
                method: 'GET',
                url: 'http://localhost:3000/fullpageload',
                headers: {
                    'PS-DataLogger-Version': '1.01'
                }
            })
                .then(sendFullPageLoadResponseData)
                .catch(sendFullPageLoadError);
        }

        function sendFullPageLoadResponseData(response) {
            console.log("Loading Grid Data");

            return response.data;
        }



        function getGridData( product, viewType, minCoupon, maxCoupon) {

            return $http({
                method: 'GET',
                url: 'http://localhost:3000/payupgrid',
                params: {
                    productName: product,
                    minCoupon: minCoupon,
                    maxCoupon: maxCoupon,
                    viewType: viewType
                },
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

        function sendFullPageLoadError(response) {
            return $q.reject('Error retrieving coupon list. (HTTP status: ' + response.status + ')');
        }
        function sendGridDataError(response) {
            return $q.reject('Error retrieving grid data. (HTTP status: ' +response.status + ')' );
        }
    };
}());