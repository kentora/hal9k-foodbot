var http = require("http");
var url = require("url");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.post("/food", function(request, response){
    console.log(request.body);

    var now = new Date();

    var split = request.body.text.split("@");
    var orderFrom = split[0];
    var orderAtString = split[1];
    var orderAtArray = orderAtString.split(":");
    var orderAt = new Date();
    orderAt.setHours(Number(orderAtArray[0]), Number(orderAtArray[1]));

    response.setHeader("content-type", "application/json");
    response.end(`{
        "response_type": "in_channel",
        "text": "@` + request.body.user_name + ` bestiller ` + orderFrom + ` klokken ` + orderAtString + ` (Om ` + timeDifferenceString(now, orderAt) + `)",
    }`);
});

function timeDifferenceString(date1, date2){
    var timeDiff = Math.abs(date1.getTime() - date2.getTime());
    var hours = Math.ceil(timeDiff / (1000 * 3600));
    var minutes = Math.ceil((timeDiff % (1000 * 3600)) / (1000 * 60));

    var s = "";
    if(hours > 0){
        s += hours + " timer"
    }
    s += " og " + minutes + " minutter";
    return s;
}

app.listen(PORT, function(){
	console.log("Listening on: " + PORT);
});
