'use strict';

(function() {

	module.exports = function(SnipShortenFactory) {
		this.getShortURL = function(url, onSuccess, onError) {
			SnipShortenFactory.getShortURL({
					url: url
				},
				function(data) {
					if (onSuccess) {
						onSuccess(data);
					}
				},
				function(error) {
					if (onError) {
						onError(error);
					}
				}
			);
		};
	};

})();
