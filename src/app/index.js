'use strict';

angular.module('hackathon2015',
  ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap'])
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
          // Set the httpProvider "not authorized" interceptor
        $httpProvider.interceptors.push(['$q', '$location', 'Authentication',
          function($q, $location, Authentication) {
            return {
              responseError: function(rejection) {
                switch (rejection.status) {
                  case 401:
                    // Deauthenticate the global user
                    Authentication.user = null;

                    // Redirect to signin page
                    $location.path('signin');
                    break;
                  case 403:
                    // Add unauthorized behaviour
                    break;
                }

                return $q.reject(rejection);
              }
            };
          }
        ]);
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/landing/landing.html',
        controller: 'MainCtrl'
      })
      .state('results', {
        url: '/results',
        templateUrl: 'app/results/results.html',
        controller: 'ResultsCtrl'
      });
     /* .state('profile', {
        url: '/settings/profile',
        templateUrl: 'users/views/settings/edit-profile.client.view.html'
      }).
      state('password', {
        url: '/settings/password',
        templateUrl: 'users/views/settings/change-password.client.view.html'
      }).
      state('accounts', {
        url: '/settings/accounts',
        templateUrl: 'users/views/settings/social-accounts.client.view.html'
      }).
      state('signup', {
        url: '/signup',
        templateUrl: 'users/views/authentication/signup.client.view.html'
      }).
      state('signin', {
        url: '/signin',
        templateUrl: 'users/views/authentication/signin.client.view.html'
      }).
      state('forgot', {
        url: '/password/forgot',
        templateUrl: 'users/views/password/forgot-password.client.view.html'
      }).
      state('reset-invalid', {
        url: '/password/reset/invalid',
        templateUrl: 'users/views/password/reset-password-invalid.client.view.html'
      }).
      state('reset-success', {
        url: '/password/reset/success',
        templateUrl: 'users/views/password/reset-password-success.client.view.html'
      }).
      state('reset', {
        url: '/password/reset/:token',
        templateUrl: 'users/views/password/reset-password.client.view.html'
      });*/

    $urlRouterProvider.otherwise('/');
  });
