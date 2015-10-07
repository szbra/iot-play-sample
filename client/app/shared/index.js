'use strict';

var app = require('angular').module('iotmarket');

// Live 3d phone model
app.service('LivePhoneDataService', require('./livephone/livePhoneDataService'));

// Mqtt service
app.service('MqttService', require('./mqtt/mqttService'));

//Short URL - IBM Snip
app.factory('SnipShortenFactory', require('./snip/SnipShortenFactory'));
app.service('SnipService', require('./snip/SnipService'));
