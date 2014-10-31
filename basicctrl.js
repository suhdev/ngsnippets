function BasicCtrl(id,events,prefix){
	var injector = angular.element('html').injector();
	var en = injector.get('general.EventsManager');
	var ig = injector.get('general.IdentityGenerator');
	var $t = injector.get('$timeout');
	this._idata = {};
	this._id = id || ig();
	this._lE = events || [];
	this._eventsPrefix = prefix || '';
	
	
	this.generic = function(key,v){
		if (angular.isDefined(v)){
			this[key] = v;
			return this;
		}
		return this[key];
	};
	this.data = function(key,value){
		if (angular.isDefined(value)){
			this._idata[key] = value;
			return this;
		}
		return this._idata[key];
	};
	this.on = function(eName,callback){
		var t = 'on'+eName;
		this[t] = this[t] || [];
		this[t].push(callback);
	};
	this.off = function(eName,callback){
		var t = 'on'+eName;
		this[t] = this[t] || [];
		if (angular.isUndefined(callback)){
			delete this[t];
		}else {
			var idx = this[t].indexOf(callback);
			if (idx !== -1){
				this[t].splice(idx,1);	
			}
		}
	};
	this.fire = function(eName,eData){
		var t = 'on'+eName;
		if (angular.isDefined(this[t])){
			if (angular.isArray(this[t])){
				for (var i=0;i<this[t].length;i++){
					$t(jQuery.proxy(this[t][i],this,eData));
					//this.runOnScope(this[t][i],eData);
				}
			}else if (angular.isFunction(this[t])){
				$t(jQuery.proxy(this[t],this,eData));
				//this.runOnScope(this[t],eData);
				
			}
		}
	};
	this.cleanUp = function(){
		en.removeListener(this);
	};
	this.trigger = function(eN,eD){
		en.trigger(this._eventsPrefix+eN,eD);
	};
	this.identity = function(identity){
		return this.generic('_id',identity);
	};
	this.listenEvents = function(events){
		return this.generic('_lE',events);
	};
	this.runOnScope = function(fn,fd){
		$t(jQuery.proxy(fn,this,fd));
	};	

	en.addListener(this);

};