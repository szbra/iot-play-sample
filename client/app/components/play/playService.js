'use strict';

var app = require('angular').module('iotmarket');

app.service('PlayService', function(){

  var _deviceId = "";
  var _password = "";
  var _emailAddress = "";

  this.setDeviceId = function(deviceId){
    _deviceId = deviceId;
  };

  this.getDeviceId = function(){
    return _deviceId;
  };

  this.setEmail = function(emailAddress){
    _emailAddress = emailAddress;
  };

  this.getEmail = function(){
    return _emailAddress;
  };

  this.setPassword = function(password){
    _password = password;
  };

  this.getPassword= function(){
    return _password;
  };
});
