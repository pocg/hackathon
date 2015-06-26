'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var groceries = require('../../app/controllers/groceries.server.controller');

	// Groceries Routes
	app.route('/groceries')
		.get(groceries.list, users.requiresLogin)
		.post(users.requiresLogin, groceries.create);

	app.route('/groceries/:groceryId')
		.get(groceries.read, users.requiresLogin)
		.put(users.requiresLogin, groceries.hasAuthorization, groceries.update)
		.delete(users.requiresLogin, groceries.hasAuthorization, groceries.delete);

	// Finish by binding the Grocery middleware
	app.param('groceryId', groceries.groceryByID);
};
