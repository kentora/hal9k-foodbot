var http = require("http");
var url = require("url");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.post("/", function(request, response){
    console.log(request.body);
    response.end("test");
});

app.listen(PORT, function(){
	console.log("Listening on: " + PORT);
});
