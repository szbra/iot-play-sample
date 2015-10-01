'use strict';

var express = require('express');
var cfenv = require('cfenv');
var app = express();
app.use(express.static(__dirname + '/public', {index: 'play.html'}));
var appEnv = cfenv.getAppEnv();

var urlRoute = require('./server/routes/snip');
var iotRoute = require('./server/routes/iotTryService');

app.get('/iotphone/device/:deviceid', function(req,res){
	var deviceid = req.params.deviceid;
	res.writeHead(302, {'Location': '/iotphone/index.html?deviceid=' + deviceid});
	res.end();
});

app.use('/url', urlRoute);
app.use('/iot', iotRoute);

app.listen(appEnv.port, function() {
	console.log("server starting on " + appEnv.url);
});
