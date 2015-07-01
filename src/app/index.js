'use strict';

angular.module('hackathon2015',
  ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/landing/landing.html',
        controller: 'MainCtrl'
      })
      .state('results', {
        url: '/results',
        templateUrl: 'app/results/results.html',
        controller: 'MainCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
;
