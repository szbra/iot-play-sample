'use strict';

module.exports = function($interval, MqttService){

	this.receiveLivePhoneData = function(deviceId, callback) {
		if(callback) {
			MqttService.connect(deviceId, function(message){
				callback({
						ax: message.ax,
						ay: message.ay,
						az: message.az,
						ob: message.ob,
						og: message.og,
						oa: message.oa,
						accelMag: Math.sqrt(
							message.ax * message.ax +
							message.ay * message.ay +
							message.az * message.az
						)
					});
			});

		}
	};

	this.stopReceivingLivePhoneData = function() {

		MqttService.disconnect();
	};
};

