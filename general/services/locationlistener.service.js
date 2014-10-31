/** 
 * @ngdoc service
 * @name general.LocationListener
 * @description implements observer pattern to notify listeners for Location changes.
 * @requires  $loaction
 * @requires  general.Exception
 */
angular.module('General')
	.factory('general.LocationListener',
		['$location','general.Exception', function ($L,_GE) {
		var _gll = function(){
			this._observers = [];
			this._parts = $L.path().match(/[a-zA-Z0-9\-]+/g);
		};

		_gll.prototype = {
			/**
			 * @ngdoc method
			 * @name  general.LocationListener#register
			 * @methodOf general.LocationListener
			 * @description registers an observer to be notified on Location changes
			 * @param {object} observer the observer object to be registered
			 * @throws general.Exception
			 */
			register:function(observer){
				if (this._observers.indexOf(observer) === -1){
					if (typeof observer.onLocationChange !== 'undefined')
						this._observers.push(observer);
					else{
						throw _GE(0x01,'Observer does not implement onLocationChange').toString();
					}
				}			
			},
			/**
			 * @ngdoc method
			 * @name  general.LocationListener#unregister
			 * @methodOf general.LocationListener
			 * @description unregisters an observer 
			 * @param {object} observer the observer object to be unregistered
			 */
			unregister:function(observer){
				var idx = this._observers.indexOf(observer);
				if (idx !== -1)
					this._observers.splice(idx,1);
			},
			/**
			 * @ngdoc method
			 * @name  general.LocationListener#_process
			 * @methodOf general.LocationListener
			 * @description invoked everytime location changes to notify all observers
			 * @throws general.Exception
			 */
			_process:function(){
				this._parts = $L.path().match(/[a-zA-Z0-9\-]+/g); 
				if (this._parts !== null && this._parts.length > 0)
					for(var i=0;i<this._observers.length;i++)
						this._observers[i].onLocationChange(this._parts[0],
							this._parts);
			},
			/**
			 * @ngdoc method
			 * @name  general.LocationListener#get
			 * @methodOf general.LocationListener
			 * @description returns the parts array of the current location 
			 */
			get:function(){
				return this._parts;
			}
		};
	
		return new _gll;
	}])
