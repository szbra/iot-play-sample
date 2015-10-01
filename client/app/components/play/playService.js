'use strict';

var app = require('angular').module('iotmarket');

app.service('PlayService', function($cookies){

  this.setDeviceId = function(deviceId){
    $cookies.put('play.deviceid', deviceId);
  };

  this.getDeviceId = function(){
    return $cookies.get('play.deviceid');
  };

  this.setEmail = function(emailAddress){
    $cookies.put('play.email', emailAddress);
  };

  this.getEmail = function(){
   return $cookies.get('play.email');
  };

  this.setPassword = function(password){
    $cookies.put('play.password', password);
  };

  this.getPassword= function(){
   return $cookies.get('play.password');
  };
});
