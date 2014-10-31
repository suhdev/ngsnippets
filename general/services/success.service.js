/**
 * @ngdoc service
 * @name general.Success
 * @description returns a function to be used by the {general.DeferredRequest} service
 * in cases of successful calls
 * @param {deferred} d the deferred object to resolve
 * @returns {function} a function that takes a single parameter (data) which is the data received from the server.
 */
angular.module('General')
	.factory('general.Success', [function () {
		return function(d){
			return function(data){
				if (data.status)
					return d.resolve(data.result);
				else
					return d.reject(data.reasons);
			}
		};
	}]);