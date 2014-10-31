/**
 * @ngdoc service
 * @name general.Storage
 * @description provides an interface for localStorage objects if supported by the browser.
 */
angular.module('General')
	.factory('general.Storage', [function () {
		var _gs = function(){
			/**
			 * @ngdoc property
			 * @name general.Storage.#enabled
			 * @propertyOf general.Storage
			 * @description indicates whether localStorage is supported or not
			 */
			this.enabled = false;
			if (typeof Storage !== 'undefined'){
				this.enabled = true;
			}
		};

		_gs.prototype = {
			/**
			 * @ngdoc method
			 * @name general.Storage#isEnabled
			 * @methodOf general.Storage
			 * @description checks whether the localStorage is supported by the browser or not.
			 * @returns {boolean} true if enabled, false otherwise
			 */
			isEnabled:function(){
				return this.enabled;
			},
			/**
			 * @ngdoc method
			 * @name general.Storage#store
			 * @methodOf general.Storage
			 * @description stores an item into the localStorage. The function converts the data to JSON.
			 * @param {string} key the key of the item to store
			 * @param {object} data the data to store
			 */
			store:function(key,data){
				if (this.enabled){
					localStorage.setItem(key,JSON.stringify(data));
				}
			},
			/**
			 * @ngdoc method
			 * @name general.Storage#remove
			 * @methodOf general.Storage
			 * @description removes an item from the localStorage. 
			 * @param {string} key the key of the item to remove
			 */
			remove:function(key){
				if (this.enabled){
					localStorage.removeItem(key);
				}
			},
			/**
			 * @ngdoc method
			 * @name general.Storage#get
			 * @methodOf general.Storage
			 * @description retrieves an item from the localStorage. 
			 * @param {string} key the key of the item to retrieve
			 * @returns {any|null} the item if available, null otherwise
			 */
			get:function(key){
				if (this.enabled){
					var item = localStorage.getItem(key);
					if (typeof item !== 'undefined' && 
						item !== null && 
						item.trim() !== ''){
						return JSON.parse(item);
					}
						
				}
				return null;
			},
			/**
			 * @ngdoc method
			 * @name general.Storage#_getType
			 * @methodOf general.Storage
			 * @private
			 * @description internal function to retrieve data from the localStorage
			 * @param {string} key the key of the item to retrieve
			 * @param {function} Fn the function to be used to convert the retrieved data
			 * @returns {any|null} the item if available, null otherwise
			 */
			_getType:function(key,Fn){
				if (this.enabled){
					var val = localStorage.getItem(key);
					if (val !== null){
						return Fn(val);
					}
				}else{
					return null;
				}
			},
			/**
			 * @ngdoc method
			 * @name general.Storage#getInteger
			 * @methodOf general.Storage
			 * @description retrieves an item from the localStorage and converts it to an integer.
			 * @param {string} key the key of the item to retrieve.
			 * @returns {number|null} the item if available, null otherwise.
			 */
			getInteger:function(key){
				return this._getType(key,parseInt);
			},
			/**
			 * @ngdoc method
			 * @name general.Storage#getFloat
			 * @methodOf general.Storage
			 * @description retrieves an item from the localStorage and converts it to an float.
			 * @param {string} key the key of the item to retrieve.
			 * @returns {number|null} the item if available, null otherwise.
			 */
			getFloat:function(key){
				return this._getType(key,parseFloat);
			},
			/**
			 * @ngdoc method
			 * @name general.Storage#getJSON
			 * @methodOf general.Storage
			 * @description retrieves an item from the localStorage and converts it to a JSON object.
			 * @param {string} key the key of the item to retrieve.
			 * @returns {object|null} the item if available, null otherwise.
			 */
			getJSON:function(key){
				return this._getType(key,JSON.parse);
			}

		};
	
		return new _gs;
	}])