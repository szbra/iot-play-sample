'use strict';

//Require Libs
var angularLib = require('angular');
require('angular-ui-router');
require('angular-cookies');
require('angular-resource');
require('angular-qrcode');

//Define the main module
var app = angularLib.module('iotmarket', ['ui.router', 'ngCookies', 'ngResource', 'monospaced.qrcode']);

//Require Application Modules
require('./shared');
require('./components/play');

//Define routes, views and controllers
app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/play');
    $stateProvider
      .state('play', {
        abstract: true,
        url: '/play',
        template: '<div ui-view></div>'
      })
      .state('play.connect', {
        url: '',
        templateUrl: 'app/components/play/connect/connectView.html',
        controller: 'ConnectController'
      })
      .state('play.device', {
        url: '/play/device',
        templateUrl: 'app/components/play/device/deviceView.html',
        controller: 'DeviceController'
      })
      .state('play.deviceData', {
        url: '/play/devicedata',
        templateUrl: 'app/components/play/deviceData/deviceDataView.html',
        controller: 'DeviceDataController'
      })
      .state('play.deviceDataExtend', {
        url: '/play/devicedataextend',
        templateUrl: 'app/components/play/deviceDataExtend/deviceDataExtendView.html',
        controller: 'DeviceDataExtendController'
      });
  })
  // redirect engine
  .run(function($rootScope, $state) {

    $rootScope.$on('$stateChangeStart', function(evt, to, params) {
      if (to.redirectTo) {
        evt.preventDefault();
        $state.go(to.redirectTo, params);
      }
    });
  });
