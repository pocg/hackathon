'use strict';

// Groceries controller
angular.module('groceries').controller('GroceriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Groceries',
	function($scope, $stateParams, $location, Authentication, Groceries) {
		$scope.authentication = Authentication;

		// current row being edited
		$scope.editIndex = null;
		
		var user = $scope.authentication.user;
		$scope.isAuthenticated = user;
		
		// Create new Grocery
		$scope.create = function() {
			// Create new Grocery object
			var grocery = new Groceries ({
				item: this.item,
				quantity: this.quantity
			});

			grocery.$save(function(response) {
				// add grocery item to list
				$scope.groceries.unshift(grocery);

				// Clear form fields
				$scope.item = '';
				$scope.quantity = '';
				$scope.form.$setPristine();

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.edit = function(index) {
			$scope.editIndex = index;
		};

		$scope.showEdit = function(index) {
			return $scope.editIndex === index;
		};

		// cancel edit - revert will restore
		$scope.cancel = function(restore) {
			if (restore)
				$scope.restore();
			$scope.editIndex = null;
		};

		// restore an edited cell if user cancels
		$scope.restore = function() {
			var index = $scope.editIndex;
			var grocery = $scope.groceries[index];
			$scope.groceries[index] = Groceries.get({ 
				groceryId: grocery._id
			});
		};

		// Remove existing Grocery
		$scope.remove = function(grocery) {
			if ( grocery ) { 
				grocery.$remove();

				for (var i in $scope.groceries) {
					if ($scope.groceries [i] === grocery) {
						$scope.groceries.splice(i, 1);
					}
				}
			} else {
				$scope.grocery.$remove(function() {
					$location.path('groceries');
				});
			}
		};

		$scope.save = function(grocery) {
			$scope.grocery = grocery;
			$scope.update();
		};

		// Update existing Grocery
		$scope.update = function() {
			var grocery = $scope.grocery;
			$scope.cancel(false);

			grocery.$update(function() {

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Filter to only show our groceries when logged in
		$scope.find = function() {
			$scope.groceries = Groceries.query();
		};

		// Find existing Grocery
		$scope.findOne = function() {
			$scope.grocery = Groceries.get({ 
				groceryId: $stateParams.groceryId
			});
		};
	}
]);