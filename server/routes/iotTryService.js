(function() {
	'use strict';

	var express = require('express'),
		router = express.Router();

	var empty = {
		"iotf-service": [{
			"name": "",
			"label": "",
			"plan": "",
			"credentials": {
				"iotCredentialsIdentifier": "",
				"mqtt_host": "",
				"mqtt_u_port": 1883,
				"mqtt_s_port": 8883,
				"base_uri": "",
				"http_host": "",
				"org": "",
				"apiKey": "",
				"apiToken": ""
			}
		}]
	};

	var config = empty;

	if (process.env.VCAP_SERVICES) {
		config = JSON.parse(process.env.VCAP_SERVICES);
	}

	router.get('/credentials', function(req, res) {

		var iotService = config['iotf-service'];
		for (var index in iotService) {
			if (iotService[index].name === 'discover-iot-try-service') {
				console.log(iotService[index].credentials);
				res.send(JSON.stringify(iotService[index].credentials));
				return;
			}
		}
		console.log(empty['iotf-service'][0].credentials);
		res.send(JSON.stringify(empty['iotf-service'][0].credentials));
	});

	module.exports = router;
}());