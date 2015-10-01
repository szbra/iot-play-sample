'use strict';

require('./../playService');

module.exports = function($scope, $state, PlayService) {

  $scope.message = 'Give us some info about your device';
  $scope.nameLabel = 'Device name';
  $scope.passwordLabel = 'Device password';
  $scope.emailLabel = 'Your email';

  $scope.deviceIdInput = PlayService.getDeviceId();
  $scope.passwordInput = PlayService.getPassword();
  $scope.emailInput = PlayService.getEmail();

  $scope.deviceInput = function() {
    PlayService.setDeviceId($scope.deviceIdInput);
    PlayService.setPassword($scope.passwordInput);
    PlayService.setEmail($scope.emailInput);
    $state.go("play.deviceData");
  };
};
