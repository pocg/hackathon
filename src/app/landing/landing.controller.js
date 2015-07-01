'use strict';

angular.module('hackathon2015')
  .controller('MainCtrl', function ($scope, search) {
    $scope.data = {};
    $scope.groups = [{name: 'Dairy'}, {name: 'Produce'}, {name: 'Meat'}];
    $scope.dairy = [];
    $scope.produce = [];
    $scope.meat = [];
    $scope.other = [];

    $scope.$on('ON_RESULTS', function(event, data) {
      $scope.group = data.group;
      $scope.item = data.item;
      $scope.data.results = data.results;
      $scope.data.disclaimer = data.disclaimer;
      if($scope.group.name === 'Dairy'){
          $scope.dairy.push({item: $scope.item,
                            results: $scope.data.results,
                            group: $scope.group});
      }else if($scope.group.name === 'Produce'){
          $scope.produce.push({item: $scope.item,
                            results: $scope.data.results,
                            group: $scope.group});
      }else if($scope.group.name === 'Meat'){
          $scope.meat.push({item: $scope.item,
                              results: $scope.data.results,
                              group: $scope.group});
      }else{
          $scope.other.push({item: $scope.item,
                results: $scope.data.results,
                group: $scope.group});
      }

    });

    $scope.collapsRecallInfo = function(){

    };
    $scope.collapsRecallInfo = function(){

    };
  });
