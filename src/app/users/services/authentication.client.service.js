'use strict';

// Authentication service for user variables
angular.module('hackathon2015').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);