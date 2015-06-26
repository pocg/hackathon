'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Grocery = mongoose.model('Grocery'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, grocery;

/**
 * Grocery routes tests
 */
describe('Grocery CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Grocery
		user.save(function() {
			grocery = {
				item: 'Grocery Name',
				quantity: 1
			};

			done();
		});
	});

	it('should be able to save Grocery instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Grocery
				agent.post('/groceries')
					.send(grocery)
					.expect(200)
					.end(function(grocerySaveErr, grocerySaveRes) {
						// Handle Grocery save error
						if (grocerySaveErr) done(grocerySaveErr);

						// Get a list of Groceries
						agent.get('/groceries')
							.end(function(groceriesGetErr, groceriesGetRes) {
								// Handle Grocery save error
								if (groceriesGetErr) done(groceriesGetErr);

								// Get Groceries list
								var groceries = groceriesGetRes.body;

								// Set assertions
								(groceries[0].user._id).should.equal(userId);
								(groceries[0].item).should.match('Grocery Name');
								(groceries[0].quantity).should.equal(1);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Grocery instance if not logged in', function(done) {
		agent.post('/groceries')
			.send(grocery)
			.expect(401)
			.end(function(grocerySaveErr, grocerySaveRes) {
				// Call the assertion callback
				done(grocerySaveErr);
			});
	});

	it('should not be able to save Grocery instance if no item is provided', function(done) {
		// Invalidate item field
		grocery.item = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Grocery
				agent.post('/groceries')
					.send(grocery)
					.expect(400)
					.end(function(grocerySaveErr, grocerySaveRes) {
						// Set message assertion
						(grocerySaveRes.body.message).should.match('Please enter a grocery item');
						
						// Handle Grocery save error
						done(grocerySaveErr);
					});
			});
	});

	it('should be able to update Grocery instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Grocery
				agent.post('/groceries')
					.send(grocery)
					.expect(200)
					.end(function(grocerySaveErr, grocerySaveRes) {
						// Handle Grocery save error
						if (grocerySaveErr) done(grocerySaveErr);

						// Update Grocery item
						grocery.item = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Grocery
						agent.put('/groceries/' + grocerySaveRes.body._id)
							.send(grocery)
							.expect(200)
							.end(function(groceryUpdateErr, groceryUpdateRes) {
								// Handle Grocery update error
								if (groceryUpdateErr) done(groceryUpdateErr);

								// Set assertions
								(groceryUpdateRes.body._id).should.equal(grocerySaveRes.body._id);
								(groceryUpdateRes.body.item).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to get a list of Groceries if not signed in', function(done) {
		// Create new Grocery model instance
		var groceryObj = new Grocery(grocery);

		// Save the Grocery
		groceryObj.save(function() {
			// Request Groceries
			request(app).get('/groceries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(0);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should not be able to get a single Grocery if not signed in', function(done) {
		// Create new Grocery model instance
		var groceryObj = new Grocery(grocery);

		// Save the Grocery
		groceryObj.save(function() {
			request(app).get('/groceries/' + groceryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('item', grocery.item);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Grocery instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Grocery
				agent.post('/groceries')
					.send(grocery)
					.expect(200)
					.end(function(grocerySaveErr, grocerySaveRes) {
						// Handle Grocery save error
						if (grocerySaveErr) done(grocerySaveErr);

						// Delete existing Grocery
						agent.delete('/groceries/' + grocerySaveRes.body._id)
							.send(grocery)
							.expect(200)
							.end(function(groceryDeleteErr, groceryDeleteRes) {
								// Handle Grocery error error
								if (groceryDeleteErr) done(groceryDeleteErr);

								// Set assertions
								(groceryDeleteRes.body._id).should.equal(grocerySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Grocery instance if not signed in', function(done) {
		// Set Grocery user 
		grocery.user = user;

		// Create new Grocery model instance
		var groceryObj = new Grocery(grocery);

		// Save the Grocery
		groceryObj.save(function() {
			// Try deleting Grocery
			request(app).delete('/groceries/' + groceryObj._id)
			.expect(401)
			.end(function(groceryDeleteErr, groceryDeleteRes) {
				// Set message assertion
				(groceryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Grocery error error
				done(groceryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Grocery.remove().exec();
		done();
	});
});
