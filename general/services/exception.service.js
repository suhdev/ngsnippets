/**
 * @ngdoc function
 * @name general.Exception.factory
 * @description
 * A factory for generating {general.Exception} objects
 * @param {Number} code error code 
 * @param {string} description error description 
 * @returns {general.Exception} a new instance of general.Exception
 */
angular.module('General')
	.factory('general.Exception', [function () {
		/**
		 * @ngdoc object
		 * @name  general.Exception
		 * @param  {number} code error code
		 * @param  {string} desc error description
		 */
		var _ge = function(code,desc){
			this._code = code;
			this._desc = desc;
		};

		_ge.prototype = {
			/**
			 * @ngdoc method
			 * @name general.Exception#code
			 * @description
			 * Returns the error code of the exception
			 * @methodOf general.Exception
			 * @returns {Number} error code
			 */
			code:function(){
				//get exception code
				return this._code;
			},
			/**
			 * @ngdoc method
			 * @name general.Exception#description
			 * @description
			 * Returns the error desciption of the exception
			 * @methodOf general.Exception
			 * @returns {string} error description
			 */
			description:function(){
				//get exception description
				return this._desc;
			},
			toString:function(){
				return 'Error with code: '+this._code+
						' has occured.\n'+this._desc;
			}
		};
	
		return function(c,d){
			return new _ge(c,d);
		};
	}])