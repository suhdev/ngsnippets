/**
 * @ngdoc service
 * @name  general.SharedDataRepository
 * @description a service to share data between controllers 
 */
angular.module('General')
	.factory('general.SharedDataRepository', [function () {
		var _gsdr = function(){
			this.repo = {};
		};

		_gsdr.prototype = {
			/**
			 * @ngdoc method
			 * @name  general.SharedDataRepository#set
			 * @methodOf general.SharedDataRepository
			 * @param {string} aK application key
			 * @param {string} dK data key
			 * @param {any} d  data 
			 * @return {general.SharedDataRepostiroy} returns the instance of the general.SharedDataRepository.
			 */
			set:function(aK,dK,d){
				this.repo[aK] = this.repo[aK] || {};
				this.repo[aK][dk] = d;
				return this;
			},
			/**
			 * @ngdoc method
			 * @name  general.SharedDataRepository#get
			 * @description returns an item from the repository if exists or undefined
			 * @methodOf general.SharedDataRepository
			 * @param  {string} aK applicatio key
			 * @param  {string} dK data key
			 * @return {any|undefined} the requested data
			 */
			get:function(aK,dK){
				if (this.exists(aK,dK)){
					return this.repo[aK][dK];
				}
			},
			/**
			 * @ngdoc method
			 * @name  general.SharedDataRepository#exists
			 * @description checks whether an item exists in the repository
			 * @methodOf general.SharedDataRepository
			 * @param  {string} aK applicatio key
			 * @param  {string} dK data key
			 * @return {any} the requested data
			 */
			exists:function(aK,dK){
				return angular.isDefined(this.repo[aK]) &&
					angular.isDefined(this.repo[aK][dK]);
			}
		};
	
		return new _gsdr;
	}]);