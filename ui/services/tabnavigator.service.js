angular.module('Ui')
	.factory('ui.TabNavigator', ['general.LocationListener','general.Apps','general.Cache',
		'general.Exception',function (_LL,_GA,_GC,_GE) {
		//service constructor 
		var _utn = function(){
			//set service controller to null
			this._ctrl = null;
			//set service cache for persistance storage
			this._cache = _GC('tabnavigator');
			//register this service to listen for location changes
			_LL.register(this);
		};

		_utn.prototype = {
			init:function(ctrl){
				//set the service controller
				this._ctrl = ctrl;
				//restore previous state from cache
				this.restore();
			},
			restore:function(){
				//get the previous opened tabs 
				var tabKeys = this._cache.get('tabs');
				//get active tab (not necessary as this will be activated from onChangeLocation)
				var active = this._cache.get('active');
				//disable cache to prevent updating cache while restoring state
				this._cache.disable();
				//check if the returned tabKeys array is not null
				if (tabKeys !== null){
					for(var i=0;i<tabKeys.length;i++){
						this.add(tabKeys[i]);
					}
				}
				if (active !== null){
					this._ctrl.tab(active);
				}else{
					if (this._ctrl.tabs.length > 0){
						this._ctrl.selIdx = this._ctrl.tabs.length -1;
					}
				}
				//enable cache to allow persistance
				this._cache.enable();
			},
			onLocationChange:function(l,all){
				this.add(l,true);
			},
			add:function(app){
				//check if the the application tab has 
				//already been instantiated
				if (!this._ctrl.exists(app)){
					//add the application tab
					this._ctrl.add(app,_GA.get(app));
				}
				this._ctrl.tab(app);
			},
			exists:function(key){
				//check if a tab already exists
				return this._ctrl.exists(key);
			},
			tab:function(key){
				//set active 
				this._ctrl.tab(key)
			},
			remove:function(key){
				//remove a tab
				this._ctrl.remove(key)
			},
			close:function(key){
				//close a tab (exists for convenience)
				this.remove(key);
			},
			persist:function(){
				//persist tab keys
				this._cache.store('tabs',this._ctrl.tabKeys);
				//persist current active tab
				this._cache.store('active',this._ctrl.tabKeys[this._ctrl.selIdx]);
				//save to local cache
				this._cache.persist();
			}
		};
	
		return new _utn;
	}])