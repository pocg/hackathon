'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Grocery = mongoose.model('Grocery');

/**
 * Globals
 */
var user, grocery;

/**
 * Unit tests
 */
describe('Grocery Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			grocery = new Grocery({
				item: 'Grocery Name',
				quantity: 1,
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return grocery.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without item', function(done) { 
			grocery.item = '';

			return grocery.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Grocery.remove().exec();
		User.remove().exec();

		done();
	});
});
