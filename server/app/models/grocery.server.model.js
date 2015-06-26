'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Grocery Schema
 */
var GrocerySchema = new Schema({
	item: {
		type: String,
		default: '',
		required: 'Please enter a grocery item',
		trim: true
	},
	quantity: {
		type: Number,
		required: 'Please enter a quantity',
		default: 1
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Grocery', GrocerySchema);
