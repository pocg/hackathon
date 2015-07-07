'use strict';

angular.module('hackathon2015')
  .controller('ResultsCtrl', function ($scope, $rootScope, search) {
    $scope.data = {};
    $scope.groups = [{name: 'Dairy'}, {name: 'Produce'}, {name: 'Meat'}];
    $scope.dairy = [];
    $scope.produce = [];
    $scope.meat = [];
    $scope.other = [];
    $scope.collapsed = false;
    $scope.colwidth = 100;

    function addItem(data){
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
    }

    addItem(search.results);


    $scope.criteria = "";
    $scope.search = function(){
        search.search($scope.criteria).then(function(data){
            $rootScope.$broadcast('ON_RESULTS', data);
            //$state.go('results');
        });
    };

    $scope.$on('ON_RESULTS', function(event, data) {
      addItem(data);
    });

    $scope.removeDairyItem = function(index){
        $scope.dairy.splice(index, 1);
    };

    $scope.removeProduceItem = function(index){
        $scope.produce.splice(index, 1);
    };

    $scope.removeMeatItem = function(index){
        $scope.meat.splice(index, 1);
    };

    $scope.removeOtherItem = function(index){
        $scope.other.splice(index, 1);
    };

    $scope.collapseRecallInfo = function(product){
        $scope.currentProduct = product;
        $scope.recallCount = product.results.length;
        $scope.pages = [];
        for(var i = 0; i<$scope.recallCount; i++){
            $scope.pages.push({page: i+1, index: i});
        }
        $scope.collapsed = !$scope.collapsed;
        if($scope.collapsed)
            $scope.colwidth = 48;
        else
            $scope.colwidth = 100;
    };

    $scope.clickPage = function(index){
        if($scope.currentResultIndex < index && index >=$scope.currentResultIndex )
            $scope.currentResultIndex = index;
    }

    $scope.currentResultIndex = 0;
    $scope.next = function(){
        if($scope.currentResultIndex < $scope.currentProduct.results.length)
            $scope.currentResultIndex++;
    }

    $scope.style = function () {
        return {
            'width': $scope.colwidth + '%'
        };
    };

    $scope.previous = function(){
        if($scope.currentResultIndex > 0)
            $scope.currentResultIndex--;
    }
  });
