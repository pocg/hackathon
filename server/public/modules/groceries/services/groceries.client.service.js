'use strict';

//Groceries service used to communicate Groceries REST endpoints
angular.module('groceries').factory('Groceries', ['$resource',
	function($resource) {
		return $resource('groceries/:groceryId', { groceryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);