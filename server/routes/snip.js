(function() {
	'use strict';

	var express = require('express'),
		router = express.Router(),
		request = require('request');

	router.get('/shorten/:url', function(req, res) {

		var url = req.params.url;

		// *******************************************************
		// for local testing purpose - we need to remove it
		// replace localhost for staging url, as localhost 'is an unsupported URI scheme' (validation error)
		if(url.indexOf('localhost') > -1){
			var cfenv = require('cfenv');
			var appEnv = cfenv.getAppEnv();
			console.log(url);
			url = url.replace('localhost:' + appEnv.port, 'discover-iot-staging.mybluemix.net');
			console.log(url);
		}
		// *******************************************************

		if (url) {
			var data = {
				// api_key created by Diego Duarte Moreira on snip service (https://snip.innovate.ibm.com)
				// any problem, please contact him.
				api_key: 'd91fab31008aa20cab21271336eee38a',
				url: url
			};

			request.post({
				url: 'https://ibm.biz/api/shorten',
				form: data
			}, function(err, httpResponse, body) {
				if(err){
					console.log(err);
				}
				if(httpResponse.statusCode === 200){
					res.send(body);
				}
			});
		}
	});

	module.exports = router;

}());
