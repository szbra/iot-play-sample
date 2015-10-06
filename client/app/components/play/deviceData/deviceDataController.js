'use strict';

require('./../playService');

module.exports = function($scope, LivePhoneDataService, $timeout, PlayService, SnipService) {

	function setMobileUrl(paramDeviceId) {
		var mobileUrl = location.hostname;
		if (location.port) {
			mobileUrl = mobileUrl + ":" + location.port;
		}
		mobileUrl = mobileUrl + "/iotphone/device/" + paramDeviceId;

		SnipService.getShortURL(mobileUrl,
			function(data) {
				$scope.gotoUrl = data.url;
			},
			function(error) {
				console.log(error);
			}
		);
	}

	function generateDeviceId() {
		var text = "";
		var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
		for (var i = 0; i < 5; i = i + 1) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return "iotdevice" + text;
	}
	//If device has not been informed, generate one
	var deviceId = PlayService.getDeviceId();
	if (!deviceId) {
		deviceId = generateDeviceId();
	}

	$scope.message = 'Your data visualized';
	$scope.gotoLabel = 'Visit this URL on your smartphone to see live data: ';
	setMobileUrl(deviceId);

	$scope.vibrationMetaData = [{
		field: "accelMag",
		name: "Vibration"
	}];
	$scope.accelMetaData = [{
		field: "ax",
		name: "Accel X"
	}, {
		field: "ay",
		name: "Accel Y"
	}, {
		field: "az",
		name: "Accel Z"
	}];

	LivePhoneDataService.receiveLivePhoneData(deviceId, function(livePhoneData) {

		$scope.hideDeviceUrl=true;
		$scope.livePhoneData = livePhoneData;
		$scope.vibrationDataPoint = livePhoneData;
		$scope.accelDataPoint = livePhoneData;

		$(".qr-code-container").css( "display", "none" );
		$(".graph-note").css( "display", "none" );
		$(".rules-container").css( "display", "block" );
		// Forces angular to run its digest cycle because LivePhoneDataService's callback is fired outside of the "angular world".
		$timeout(function() {
			$scope.$apply();
		}, 0);

	});

	$scope.$on("$destroy", function() {
		LivePhoneDataService.stopReceivingLivePhoneData();
	});
};
