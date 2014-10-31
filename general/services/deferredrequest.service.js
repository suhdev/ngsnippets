/**
 * @ngdoc service
 * @name General.service:DeferredRequest
 * @description
 * Provides a unified method to handle AJAX requests
 * @requires $q
 * @requires $http
 * @requires General.service:Success
 * @requires General.service:Error
 */
angular.module('General')
	.factory('general.DeferredRequest', ['$q','$http','general.Success',
		'general.Error',function ($Q,$H,_SCS,_ERR) {
		return function(_method,_url,_data,config,queryData){
			var _d = $Q.defer();
			var sFn = _SCS;
			var eFn = _ERR;
			if (typeof config !== 'undefined'){
				if (typeof config.success !== 'undefined' &&
					angular.isFunction(config.success)){
					sFn = config.success;
				}
				if (typeof config.error !== 'undefined' &&
					angular.isFunction(config.error)){
					eFn = config.error;
				}
			}
			if (_method.toLowerCase() === 'get' || 
				typeof _data === 'undefined'){
				$H[_method](_url)
					.success(sFn(_d))
					.error(eFn(_d));	
			}else {
				$H[_method](_url,_data)
					.success(sFn(_d))
					.error(eFn(_d));
			}
			return _d.promise;
		};
	}]);