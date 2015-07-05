'use strict';

angular.module('hackathon2015')
  .controller('MainCtrl', function ($scope, $rootScope, $state, $http, search) {
    $scope.data = {};
    $scope.groups = [{name: 'Dairy'}, {name: 'Produce'}, {name: 'Meat'}];
    $scope.dairy = [];
    $scope.produce = [];
    $scope.meat = [];
    $scope.other = [];

    var startPos;
    var geoSuccess = function(position) {
        alert('latitude is: ' + position.coords.latitude + ', longitude is: ' + position.coords.longitude);
        $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+position.coords.latitude+','+position.coords.longitude+'&sensor=true').then(function(res){
            alert('Your address is: ' +res.data.results[0].formatted_address);
        });
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);

    $scope.criteria = "";
    $scope.search = function(){
        search.search($scope.criteria).then(function(data){
            $rootScope.$broadcast('ON_RESULTS', data);
            $state.go('results');
        });
    };
  });
