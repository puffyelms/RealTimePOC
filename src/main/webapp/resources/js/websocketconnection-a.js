

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

var tablesToUpdateList = "";
var cellDataTest = 25;

//function getTablesToUpdateList() {
//    return tablesToUpdateList;
//}
var receivedFeed = null;
function onSocketMessage(event) {
    if (event.data) {
        console.log("event.data=" + event.data);
        receivedFeed = JSON.parse(event.data);
        console.log("Received Object: " + JSON.stringify(receivedFeed));



        var scope = angular.element(document.getElementById("MainWrap")).scope();
        scope.$apply(function () {
            cellDataTest =  cellDataTest +1;
            var newData = receivedFeed.adjustedPrices;

                //[
                //    { "month1": cellDataTest,  "month2" : 22, "month3": 80, "month4" : 2000  },
                //    { "month1": 9,  "month2" : 100, "month3": 80, "month4" : 20  },
                //    { "month1": 9,  "month2" : 220, "month3": 80, "month4" : 20  },
                //    { "month1": 11, "month2" : 19, "month3": 14, "month4" : 2  }
                //];

            //scope.updateCustomRequest(data, type, res);
            scope.updateCustomRequest(newData);
        })


        //angular.element(document.getElementById('AppCtrl')).scope().controller.revert()‌​;

        console.log("End Received Object: " + JSON.stringify(receivedFeed));


        if (receivedFeed.action === "add") {






            //Insert code here...


            //var mySpan = document.getElementById("myForm:label1");
            //mySpan.innerHTML = receivedFeed.timestamp;
            //
            //console.log("timestamp="+receivedFeed.timestamp);
            //console.log("tableToUpdate="+receivedFeed.tableToUpdate);
            //
            //if (receivedFeed.tableToUpdate !== "") {
            //
            //    tablesToUpdateList = receivedFeed.tableToUpdate;
            //
            //    //window[updateAllThatChanged]();
            //    updateAllThatChanged([{name:'updateTheseGrids',value:tablesToUpdateList}]);
            //
            //    //window[receivedFeed.tableToUpdate
            //    //PF('topBar').show();
            //    tableUpdated = true;
            //    //                divsToUpdate="@(.post_1),@(.post_3)";
            //    //              animateNewPost(0);
            //    data[1][3] = '12';
            //    highlightVals[1][3] = 0;
            //    hot.render();
            //} else {
            //    PF('topBar').hide();
            //    //              animateNewPost(1);
            //    tableUpdated = false;
            //    data[1][3] = '-10';
            //    highlightVals[1][3] = 2;
            //    hot.render();
            //}


        }
    }
}