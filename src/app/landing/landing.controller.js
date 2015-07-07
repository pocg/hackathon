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
        //alert('latitude is: ' + position.coords.latitude + ', longitude is: ' + position.coords.longitude);
        $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+position.coords.latitude+','+position.coords.longitude+'&sensor=true').then(function(res){
            /*alert('Your address is: ' +res.data.results[0].formatted_address);
            alert('City: ' + res.data.results[0].address_components[3].long_name);
            alert('State: ' + res.data.results[0].address_components[5].short_name);
            alert('Zip: ' + res.data.results[0].address_components[7].short_name);*/
            search.location.city = res.data.results[0].address_components[3].long_name;
            search.location.state = res.data.results[0].address_components[5].short_name;
            search.location.zip = res.data.results[0].address_components[7].short_name;

           // search.location.city = 'Louisville';
           // search.location.state = 'KY';

            search.searchAllRecalls().then(function(data){
                console.log(data);
                $scope.allrecalls = [];
                var top = 0;
                for(var i = 0; i< data.results.length; i++){
                    if(i>3){
                        break;
                    }
                    $scope.allrecalls.push({product: data.results[i].product_description, reason: data.results[i].reason_for_recall});
                }
            });
            //search.location.zip = res.data.results[0].address_components[7].short_name;

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
