'use strict';

angular.module('hackathon2015')
  .controller('MainCtrl', function ($scope, search) {
    $scope.data = {};
    $scope.$on('ON_RESULTS', function(event, data) {
      $scope.data.results = data.results;
      $scope.data.disclaimer = data.disclaimer;
    });
  });
