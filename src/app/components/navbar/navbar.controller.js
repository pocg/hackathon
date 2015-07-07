'use strict';

angular.module('hackathon2015')
  .controller('NavbarCtrl', function ($scope, $rootScope, $state, search) {
   /* $scope.criteria = "";
    $scope.search = function(){
      search.search($scope.criteria).then(function(data){
          $rootScope.$broadcast('ON_RESULTS', data);
          $state.go('results');
      });
    };*/

    $scope.signin = function(){
        $state.go('signin');
    }
    $scope.signup = function(){
        $state.go('signup');
    }
  });
