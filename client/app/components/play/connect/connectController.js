'use strict';

module.exports = function($scope, $cookies, $timeout, PlayService) {

  $scope.message = 'Connect a device to the cloud in seconds';
  $scope.connectMessage = "If you have an internet connected smartphone or another device with you then get it connected now below, visualize the data being streamed live from the device and learn more about what IBM Internet of Things can do for you.";

  $scope.smartphoneLink = "Connect my smartphone";
  $scope.deviceLink = "Connect another device";

  $scope.infoTitleMessage = "View devices in our demo organization";
  $scope.infoStatusMessage = "324 devices were connected in the past 24 hours";

  $scope.infoNoteMessage = "Please note: this is not a secure connection and everyone will be able to see connected devices and the data sent.";
  $scope.infoLink = "Take me there";

  PlayService.setDeviceId("");
  PlayService.setPassword("");
  PlayService.setEmail("");

  console.log("selection-box click");

  $scope.selected = "smartphone";

  $scope.selectSmartphone = function() {
    $scope.selected = "smartphone";
  };
  $scope.selectDevice = function() {
    $scope.selected = "device";
  };
};
