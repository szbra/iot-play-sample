'use strict';

var express = require('express');
var cfenv = require('cfenv');
var app = express();
app.use(express.static(__dirname + '/public', {
	index: 'play.html'
}));
var appEnv = cfenv.getAppEnv();

var urlRoute = require('./server/routes/snip');
var iotRoute = require('./server/routes/iotTryService');

app.get('/iotphone/device/:deviceid', function(req, res) {
	var deviceid = req.params.deviceid;
	res.writeHead(302, {
		'Location': '/iotphone/index.html?deviceid=' + deviceid
	});
	res.end();
});

app.use('/url', urlRoute);
app.use('/iot', iotRoute);

console.log("Environment variable HTTPS: " + process.env.HTTPS);
if (process.env.HTTPS === "true") {
	//Used for testing enviroments outside bluemix only
	var fs = require('fs');
	var options = {
		key: fs.readFileSync('./server/config/Xmam.ibmserviceengage.com.privatekey'),
		cert: fs.readFileSync('./server/config/mam_ibmserviceengage_com.pem'),
		ciphers: 'ECDHE-RSA-AES256-SHA:AES256-SHA:RC4-SHA:HIGH:!RC4:!MD5:!aNULL:!EDH:!AESGCM',
		honorCipherOrder: true
	};
	var httpServer = require('https').createServer(options, app);
	var port = 9991;
	if (process.env.PORT) {
		port = process.env.PORT;
	}
	app.set('port', port);
	httpServer.listen(app.get('port'), function() {
		console.log('Node server listening https on port:' + app.get('port'));
	});
} else {
	app.listen(appEnv.port, function() {
		console.log("server starting on " + appEnv.url);
	});
}
