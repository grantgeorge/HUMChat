/* global Firebase */

'use strict';

angular.module('liveChatApp')
  .controller('MainCtrl', function ($scope, $firebase) {
    
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var ref = new Firebase('https://hackumass.firebaseio.com/chat');
    var boopRef = new Firebase('https://hackumass.firebaseio.com/-JJo1oMjLJmQh0vK-xxC/boops');

    $scope.messages = $firebase(ref);
    $scope.boops = $firebase(boopRef);

    $scope.loadAll = false;

    $scope.addMessage = function(e) {
      if (e.keyCode !== 13) { return; }

      $scope.msgTime = new Date();
      $scope.msgTime = $scope.msgTime.getTime();

      $scope.messages.$add({from: $scope.name, body: $scope.msg, time: $scope.msgTime});

      $scope.msg = '';
      $scope.msgTime = 0;
    };

    $scope.boopIncrement = function() {
      boopRef.transaction(function(currentVal) {
        if( !currentVal ) {
          currentVal = {boop: 0};
        }
        currentVal.boop++;
        return currentVal;
      });
    };

    $scope.boopDecrement = function() {
      boopRef.transaction(function(currentVal) {
        if( !currentVal ) {
          currentVal = {boop: 0};
        }
        currentVal.boop--;
        return currentVal;
      });
    };

  });
