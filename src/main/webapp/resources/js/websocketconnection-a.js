

var attempts = 1;
var time = 0;

function createWebSocket() {
    console.log("In createWebSocket.  Attempting to connection... attempts=" + attempts + ", delay time=" + time);
    var connection = new WebSocket("ws://localhost:7001/MarketDataServer/dataSocket");

    connection.onopen = function () {
        // reset the tries back to 1 since we have a new connection opened.
        attempts = 1;
        console.log("Made connection.");
        $('#myModal').modal('hide');
        //var dlg = PF('dlgLostConnection');
        //if (dlg) {
        //    dlg.hide();
        //}
    };

    connection.onclose = function () {
        console.log("In onclose");
        time = generateInterval(attempts);

        setTimeout(function () {
            // We've tried to reconnect so increment the attempts by 1
            attempts++;
            $('#myModal').modal('show');
            //var dlg = PF('dlgLostConnection');
            //dlg.show();
            // Connection has closed so try to reconnect every 10 seconds.
            createWebSocket();
        }, time);

    };



    connection.onerror = function (event) {
        console.log("In onerror: Error ", event);
    };

    connection.onmessage = onSocketMessage;
}

// generate the interval to a random number between 0 and the maxInterval determined from above
function generateInterval (k) {
    // If the generated interval is more than 30 seconds, truncate it down to 30 seconds
    return Math.min(30, (Math.pow(2, k) - 1)) * 1000;
}

function onSocketMessage(event) {
    if (event.data) {
        var receivedFeed = JSON.parse(event.data);
        console.log("Received Object: " + JSON.stringify(receivedFeed));

        //angular.element(document.getElementById('AppCtrl')).scope().controller.revert()‌​;
        //console.log("End Received Object: " + JSON.stringify(receivedFeed));

        if (receivedFeed.action === "add") {

            var scope = angular.element(document.getElementById("MainWrap")).scope();
            scope.setStagedProductData(receivedFeed.adjustedPrices);
            scope.updateStagedData();
            scope.$apply(function () {
                scope.updateStagedData();
            })

        }
    }
}