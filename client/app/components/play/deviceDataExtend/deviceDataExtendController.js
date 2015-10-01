'use strict';

module.exports = function($scope, LivePhoneDataService, $timeout, PlayService) {

	$scope.message = 'Your data visualized - extension';
	$scope.limessage1 = "Shake your phone until vibration exceeds 10";
	$scope.limessage2 = "Change the rules";

	$scope.gotoLabel = 'Visit this URL on your smartphone to see live data: ';
	//If device has not been informed, generate one
	var deviceId = PlayService.getDeviceId();

	$scope.vibrationMetaData = [{
		field: "accelMag",
		name: "Vibration"
	}];

	LivePhoneDataService.receiveLivePhoneData(deviceId, function(livePhoneData) {
		$scope.vibrationDataPoint = livePhoneData;
		// Forces angular to run its digest cycle because LivePhoneDataService's callback is fired outside of the "angular world".
		$timeout(function() {
			$scope.$apply();
		}, 0);
	});

	$scope.$on("$destroy", function() {
		LivePhoneDataService.stopReceivingLivePhoneData();
	});
};
