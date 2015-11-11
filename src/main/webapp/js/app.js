

var app = angular.module('app', []);


app.factory('WebSocketService', function($q, $rootScope) {

    // We return this object to anything injecting our service
    var Service = {};
    // Keep all pending requests here until they get responses
    var callbacks = {};
    // Create a unique callback ID to map requests to responses
    var currentCallbackId = 0;
    // Create our websocket object with the address to the websocket
    var ws = new WebSocket("ws://localhost:7001/MarketDataServer/dataSocket");

    var attempts = 1;
    var time = 0;

    ws.onopen = function(){
        console.log("Socket has been opened!");
        // reset the tries back to 1 since we have a new connection opened.
        attempts = 1;
        $('#myModal').modal('hide');
    };

    ws.onclose = function () {
        console.log("In onclose");
        time = generateInterval(attempts);

        setTimeout(function () {
            // We've tried to reconnect so increment the attempts by 1
            attempts++;
            $('#myModal').modal('show');

            // Connection has closed so try to reconnect every 10 seconds.
            createWebSocket();
        }, time);

    };

    ws.onerror = function (event) {
        console.log("In onerror: Error ", event);
    };

    // generate the interval to a random number between 0 and the maxInterval determined from above
    function generateInterval (k) {
        // If the generated interval is more than 30 seconds, truncate it down to 30 seconds
        return Math.min(30, (Math.pow(2, k) - 1)) * 1000;
    }

    ws.onmessage = function(message) {

        //listener(JSON.parse(message.data));

        if (message.data) {
            console.log("In onmessage: message= ", message.data);
            listener(JSON.parse(message.data));
        }

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

        var receivedFeed = data;
        console.log("Received data from websocket: ", receivedFeed);
        if (receivedFeed.action === "add") {

            //TODO: THIS NEEDS TO BE INCORPORATED... RIGHT NOW I'M NOT PASSING THE CALLBACK_ID
            // If an object exists with callback_id in our callbacks object, resolve it
            if(callbacks.hasOwnProperty(receivedFeed.callback_id)) {
                console.log(callbacks[receivedFeed.callback_id]);
                $rootScope.$apply(callbacks[receivedFeed.callback_id].cb.resolve(receivedFeed.data));
                delete callbacks[receivedFeed.callbackID];
            }

            //TODO: THIS IS CALLING THE CONTROLLER FROM THE FACTORY, IT SHOULD BE THE OTHERWAY AROUND SINCE THE CONTROLLER LIVES AND DIES, FACTORY ALWAYS LIVES
            var scope = angular.element(document.getElementById("MainWrap")).scope();
            scope.setStagedProductData(receivedFeed.adjustedPrices);
            scope.updateStagedData();
            scope.$apply(function () {
                scope.updateStagedData();
            })

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

app.controller('AppCtrl', function ($scope, WebSocketService) {
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

