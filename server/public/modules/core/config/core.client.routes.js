'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing - home updated to groceries
		$stateProvider.
		state('home', {
            url: '/',
            templateUrl: 'modules/groceries/views/list-groceries.client.view.html'
        });
	}
]);