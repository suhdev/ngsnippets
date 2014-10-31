/**
 * @ngdoc service
 * @name general.Error
 * @description
 * Handles rejection of DeferredRequests 
 */
angular.module('General')
	.factory('general.Error', [function () {
		return function(d){
			return function(data){
				d.reject([{
					code:0x11111,
					description:'Network error'
				}]);
			}
		};
	}]);