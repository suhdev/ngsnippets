/**
 * @ngdoc service
 * @name general.Cache
 * @description
 * Provides an internal cache with persistance support (if the browser supports it)
 */
angular.module('General')
	.factory('general.Cache', ['general.Storage',function (_GS) {
		/**
		 * @ngdoc method
		 * @name general.Cache#constructor
		 * @param {string} key the application key, this key is used to store items in the persistence storage.
		 * @property {object} data the cache storage object
		 * @property {bool} enabled whether the cache object is enabled or disabled
		 * @methodOf general.Cache
		 * @description
		 * Creates a new cache object. The new cache will also automatically restore any previous states from the persistance storage
		 */
		var _gc = function(key){
			this.data = {};
			this.key = key;
			this.enabled = true;
			if (_GS.isEnabled()){
				this.restore();
			}
		};

		_gc.prototype = {
			/**
			 * @ngdoc method
			 * @name general.Cache#store
			 * @param {string} key the item key. 
			 * @param {string|integer|float|bool|Array|object} value the item value.
			 * @methodOf general.Cache
			 * @description
			 * Stores an element in the cache. <b>Note:</b> Any item with the same key will be overriden
			 */
			store:function(key,value){
				if (this.enabled){
					this.data[key] = value;
				}
			},

			/**
			 * @ngdoc method
			 * @name general.Cache#disable
			 * @methodOf general.Cache
			 * @description
			 * Disables the cache object such that invoking store, get, persist will result nothing.
			 * This is mainly useful upon restoring the previous object state from cache
			 */
			disable:function(){
				this.enabled = false;
			},

			/**
			 * @ngdoc method
			 * @name general.Cache#enable
			 * @methodOf general.Cache
			 * @description
			 * Enables the cache object
			 */
			enable:function(){
				this.enabled = true;
			},

			/**
			 * @ngdoc method
			 * @name general.Cache#persist
			 * @methodOf general.Cache
			 * @description
			 * Stores the current state of the cache into the loaclStorage (persistance)
			 */
			persist:function(){
				if (this.enabled){
					_GS.store(this.key,this.data);
				}
			},

			/**
			 * @ngdoc method
			 * @name general.Cache#restore
			 * @methodOf general.Cache
			 * @description
			 * Restores the most recent cache state from the localStorage (persistance) 
			 */
			restore:function(){
				this.enabled = false;
				var temp = _GS.getJSON(this.key);
				if (temp === null ||
					typeof temp === 'undefined' ||
					!angular.isObject(temp)){
					this.data = {};
				}else{
					this.data = temp;
				}
				this.enabled = true;
			},

			/**
			 * @ngdoc method
			 * @name general.Cache#get
			 * @methodOf general.Cache
			 * @param {string} key the item key to retrieve from the cache
			 * @returns {any|null} returns the requested item or null if not available 
			 * @description
			 * Returns an item from the cache given its key
			 */
			get:function(key){
				if (this.enabled){
					var t = this.data[key];
					if (typeof t !== 'undefined' &&
						t !== null){
						return this.data[key];
					}
					return null;
				}
			},
		};

		/**
		 * @ngdoc function
		 * @name general.Cache#factory
		 * @param {string} key the application key, this key is used to store items in the persistence storage.
		 * @methodOf general.Cache
		 * @description
		 * Creates a new cache object. The new cache will also automatically restore any previous states from the persistance storage
		 */
		return function(key){
			return new _gc(key);
		};
	}])