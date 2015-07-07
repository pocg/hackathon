'use strict';

/**
 * @ngdoc service
 * @name hackathon2015App.search
 * @description
 * # search
 * Service in the hackathon2015App.
 */
angular.module('hackathon2015')
  .factory('search', function search($http, $q, config) {
    var results = {};
    var location = {};
    var all = {};
    function searchForRecalls(criteria, group){
      var deferred = $q.defer();
      $http.get(config.baseURL + 'search=reason_for_recall:' + criteria + '+AND+city:' + location.city + '+AND+state:' + location.state +'&limit=20').
        success(function(data, status, headers, config) {
          // this callback will be called asynchronously
          // when the response is available
          deferred.resolve({
            item: criteria,
            group: group,
            results: data.results,
            disclaimer: data.meta.disclaimer
          });
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          deferred.resolve({
            message: 'No Results'
          });
        });
      return deferred.promise;
    };

    var search = function(criteria){
      var deferred = $q.defer();
      var groups = [{name: 'Dairy'}, {name: 'Produce'}, {name: 'Meat'}];
      $http.get(config.baseFGURL + 'format=json&q=' + criteria + '&max=25&offset=0&api_key=DEMO_KEY').
          success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            var group = '';
            for (var j = 0, datalen = data.list.item.length; j < datalen; j++) {
              for (var i = 0, len = groups.length; i < len; i++) {
                var searchString = groups[i].name.substring(0, groups[i].name.length-1);
                var pattern = new RegExp(searchString, 'gi');
                if (pattern.test(data.list.item[j].group)) {
                  group = groups[i];
                  break;
                }
              }
              if(group === ''){
                break;
              }
            }
            searchForRecalls(criteria, group).then(function(recalls){
              results.item = criteria;
              results.group = group;
              results.results = recalls.results;
              results.disclaimer = recalls.disclaimer;
              deferred.resolve(results);
            });

          }).
          error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            deferred.resolve({
              message: 'No Results'
            });
          });
      return deferred.promise;
    };


    var searchAllRecalls = function(){
      var deferred = $q.defer();
      $http.get(config.baseURL + 'search=city:' + location.city + '+AND+state:' + location.state +'&limit=20').
          success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            deferred.resolve({
              results: data.results,
              disclaimer: data.meta.disclaimer
            });
          }).
          error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            deferred.resolve({
              message: 'No Results'
            });
          });
      return deferred.promise;
    };

    return {
      search: search,
      searchAllRecalls: searchAllRecalls,
      results: results,
      location: location,
      all: all
    };
  });
