'use strict';

/**
 * @ngdoc service
 * @name hackathon2015App.search
 * @description
 * # search
 * Service in the hackathon2015App.
 */
angular.module('hackathon2015')
  .service('config', function search() {
     //this.baseURL = 'https://api.fda.gov/drug/enforcement.json?api_key=94kv4aUK7gBxZZHTYnCVYKlUh8HNxwDYCpzpxOp1&';
    this.baseURL = 'https://api.fda.gov/drug/enforcement.json?';
  });
