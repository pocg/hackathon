'use strict';

//Setting up route
angular.module('groceries').config(['$stateProvider',
	function($stateProvider) {
		// Groceries state routing
		$stateProvider.
		state('listGroceries', {
			url: '/groceries',
			templateUrl: 'modules/groceries/views/list-groceries.client.view.html'
		}).
		state('createGrocery', {
			url: '/groceries/create',
			templateUrl: 'modules/groceries/views/create-grocery.client.view.html'
		}).
		state('viewGrocery', {
			url: '/groceries/:groceryId',
			templateUrl: 'modules/groceries/views/view-grocery.client.view.html'
		}).
		state('editGrocery', {
			url: '/groceries/:groceryId/edit',
			templateUrl: 'modules/groceries/views/edit-grocery.client.view.html'
		});
	}
]);