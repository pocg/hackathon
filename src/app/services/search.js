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
    var search = function(criteria){
      var deferred = $q.defer();
      $http.get(config.baseURL + 'search=reason_for_recall:' + criteria + '&limit=20').
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
      search: search
    };
  });
