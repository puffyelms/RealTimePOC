

var app = angular.module('app', []);


app.factory('MyService', function($q, $rootScope) {
//angular.module('app').factory('MyService', ['$q', '$rootScope', function($q, $rootScope) {
    // We return this object to anything injecting our service
    var Service = {};
    // Keep all pending requests here until they get responses
    var callbacks = {};
    // Create a unique callback ID to map requests to responses
    var currentCallbackId = 0;
    // Create our websocket object with the address to the websocket
    var ws = new WebSocket("ws://localhost:7001/MarketDataServer/dataSocket");


    ws.onopen = function(){
        console.log("Socket has been opened!");
    };

    ws.onmessage = function(message) {
        listener(JSON.parse(message.data));
    };

    function sendRequest(request) {
        var defer = $q.defer();
        var callbackId = getCallbackId();
        callbacks[callbackId] = {
            time: new Date(),
            cb:defer
        };
        request.callback_id = callbackId;
        console.log('Sending request', request);
        ws.send(JSON.stringify(request));
        return defer.promise;
    }

    function listener(data) {
        var messageObj = data;
        console.log("Received data from websocket: ", messageObj);
        // If an object exists with callback_id in our callbacks object, resolve it
        if(callbacks.hasOwnProperty(messageObj.callback_id)) {
            console.log(callbacks[messageObj.callback_id]);
            $rootScope.$apply(callbacks[messageObj.callback_id].cb.resolve(messageObj.data));
            delete callbacks[messageObj.callbackID];
        }
    }
    // This creates a new callback ID for a request
    function getCallbackId() {
        currentCallbackId += 1;
        if(currentCallbackId > 10000) {
            currentCallbackId = 0;
        }
        return currentCallbackId;
    }

    // Define a "getter" for getting customer data
    Service.getCustomers = function() {
        var request = {
            type: "get_customers"
        }
        // Storing in a variable for clarity on what sendRequest returns
        var promise = sendRequest(request);
        return promise;
    }

    return Service;
});

app.controller('AppCtrl', function ($scope, MyService) {
    var vm = this;

    $scope.stagedProductGrid = {};
    $scope.customParams = {};

    $scope.setStagedProductData = function (data2) {
        $scope.stagedProductGrid = data2;
    }

    //Called from websockets.
    $scope.updateStagedData = function () {
        var newData2 = $scope.stagedProductGrid;
        for (var key in newData2) {
            var couponCell = newData2[key];

            var couponToModify = vm.productGrid[couponCell.coupon];
            couponToModify.cellMonth1.currentPrice = couponCell.month1;
            couponToModify.cellMonth2.currentPrice = couponCell.month2;
            couponToModify.cellMonth3.currentPrice = couponCell.month3;
            couponToModify.cellMonth4.currentPrice = couponCell.month4;
        }
    };

    vm.productGrid = angular.copy(initial);

    vm.loadData = function loadData() {
        vm.productGrid = angular.copy(changed);
    };

    vm.changeValue = function changeValue() {
        vm.productGrid[0].month1 = 99;
    };

    vm.revert = function revert() {
        vm.productGrid = angular.copy(initial);
    };
});

app.directive('highlighter', function ($timeout) {
    return {
        restrict: 'A',
        scope: {
            model: '=highlighter'
        },
        link: function (scope, element) {
            scope.$watch(
                'model',
                function (newVal, oldVal) {


                    if (newVal.currentPrice > newVal.cobPrice) {
                        element.addClass('highlight-cob-up');
                        element.removeClass('highlight-cob-down');
                    } else if (newVal.currentPrice < newVal.cobPrice) {
                        element.addClass('highlight-cob-down');
                        element.removeClass('highlight-cob-up');
                    } else {
                        element.removeClass('highlight-cob-up');
                        element.removeClass('highlight-cob-down');
                    }

                    if (newVal.currentPrice > oldVal.currentPrice) {
                        // apply class
                        //$('#lblName').closest('tr').index();
                        element.addClass('highlight-up');

                        // auto remove after some delay
                        $timeout(function () {
                            element.removeClass('highlight-up');
                        }, 2000);
                    } else if (newVal.currentPrice < oldVal.currentPrice) {
                        // apply class
                        element.addClass('highlight-down');

                        // auto remove after some delay
                        $timeout(function () {
                            element.removeClass('highlight-down');
                        }, 2000);
                    }

                }, true
            );
        }
    };
});

