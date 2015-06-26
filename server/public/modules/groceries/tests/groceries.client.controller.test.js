'use strict';

(function() {
	// Groceries Controller Spec
	describe('Groceries Controller Tests', function() {
		// Initialize global variables
		var GroceriesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Groceries controller.
			GroceriesController = $controller('GroceriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Grocery object fetched from XHR', inject(function(Groceries) {
			// Create sample Grocery using the Groceries service
			var sampleGrocery = new Groceries({
				item: 'New Grocery',
				quantity: 1
			});

			// Create a sample Groceries array that includes the new Grocery
			var sampleGroceries = [sampleGrocery];

			// Set GET response
			$httpBackend.expectGET('groceries').respond(sampleGroceries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.groceries).toEqualData(sampleGroceries);
		}));

		it('$scope.findOne() should create an array with one Grocery object fetched from XHR using a groceryId URL parameter', inject(function(Groceries) {
			// Define a sample Grocery object
			var sampleGrocery = new Groceries({
				item: 'New Grocery',
				quantity: 1
			});

			// Set the URL parameter
			$stateParams.groceryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/groceries\/([0-9a-fA-F]{24})$/).respond(sampleGrocery);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.grocery).toEqualData(sampleGrocery);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and stay on the same URL', inject(function(Groceries) {
			// Create a sample Grocery object
			var sampleGroceryPostData = new Groceries({
				item: 'New Grocery',
				quantity: 2
			});

			// Create a sample Grocery response
			var sampleGroceryResponse = new Groceries({
				_id: '525cf20451979dea2c000001',
				item: 'New Grocery',
				quantity: 2
			});

			// mock groceries array and form object
			scope.groceries = [];
			scope.groceries.push(sampleGroceryPostData);
			scope.form = { $setPristine: function() {}};

			// Fixture mock form input values
			scope.item = 'New Grocery';
			scope.quantity = 2;

			// Set POST response
			$httpBackend.expectPOST('groceries', sampleGroceryPostData).respond(sampleGroceryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.item).toEqual('');
			expect(scope.quantity).toEqual('');

			// item should be added to the groceries list
			expect(scope.groceries.length, 2);

			// new item should be added to the front (unshift) of the array
			expect(scope.groceries[0]._id, sampleGroceryResponse._id);

			// location should stay the same - no redirect
			expect($location.path()).toBe('');
		}));

		it('$scope.update() should update a valid Grocery', inject(function(Groceries) {
			// Define a sample Grocery put data
			var sampleGroceryPutData = new Groceries({
				_id: '525cf20451979dea2c000001',
				item: 'New Grocery',
				quantity: 2
			});

			// Mock Grocery in scope
			scope.grocery = sampleGroceryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/groceries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// stay on the same page
			expect($location.path()).toBe('');
		}));

		it('$scope.cancel() on edit should restore the item', inject(function(Groceries) {
			// Define a sample Grocery object
			var sampleGrocery = new Groceries({
				_id: '525a8422f6d0f87f0e407a33',
				item: 'New Grocery',
				quantity: 1
			});

			scope.groceries = [];
			scope.groceries.push(sampleGrocery);

			scope.edit(0);

			scope.groceries[0].item = 'Grocery++';
			scope.groceries[0].quantity = 99;

			// Set GET response
			$httpBackend.expectGET(/groceries\/([0-9a-fA-F]{24})$/).respond(sampleGrocery);

			scope.cancel(true);
			$httpBackend.flush();

			// expect the edit index to be set to null
			expect(scope.editIndex).toBeNull();

			// expect the edited item to be restored to its previous state
			expect(scope.groceries[0].item).toEqual(sampleGrocery.item);
			expect(scope.groceries[0].quantity).toEqual(sampleGrocery.quantity);
		}));

		it('$scope.remove() should send a DELETE request with a valid groceryId and remove the Grocery from the scope', inject(function(Groceries) {
			// Create new Grocery object
			var sampleGrocery = new Groceries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Groceries array and include the Grocery
			scope.groceries = [sampleGrocery];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/groceries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleGrocery);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.groceries.length).toBe(0);
		}));

		it('$scope.edit() should set scope.editIndex', inject(function(Groceries) {
			scope.edit(55);
			expect(scope.editIndex).toBe(55);
		}));

		it('$scope.save() should set scope.grocery', inject(function(Groceries) {
			var sampleGroceryPostData = new Groceries({
				item: 'New Grocery',
				quantity: 2
			});
			scope.save(sampleGroceryPostData);
			expect(scope.grocery).toEqualData(sampleGroceryPostData);
		}));

	});
}());