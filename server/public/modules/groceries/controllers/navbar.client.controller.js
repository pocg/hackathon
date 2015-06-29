'use strict';

angular.module('groceries')
  .controller('NavbarCtrl', function ($scope, $rootScope, search) {
    $scope.criteria = "";
    $scope.search = function(){
      search.search($scope.criteria).then(function(data){
          $rootScope.$broadcast('ON_RESULTS', data);
      });
    };
  });
