'use strict';

(function() {

	module.exports = function($resource) {
		return $resource('/url/shorten/:url', {
			url: '@url'
		}, {
			'getShortURL': {
				method: 'GET',
				isArray: false
			}
		});
	};

})();
