(function() {

    //app.factory('dataService',['$q', '$timeout', '$http', dataService]);
    angular.module('app-wijmo')
        .factory('dataService',['$q', '$timeout', '$http', dataService]);

    function dataService($q, $timeout, $http) {
        return {
            getFullPageLoad: getFullPageLoad,
            getGridData: getGridData
        };


        function getFullPageLoad() {

            return $http({
                method: 'GET',
                url: 'http://localhost:3000/fullPageLoad',
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



        function getGridData( minCoupon, maxCoupon) {

            return $http({
                method: 'GET',
                url: 'http://localhost:3000/refreshGrid',
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