angular.module('Ui')
	.factory('ui.Sidebar', ['general.LocationListener',function (_LL) {
		var _us = function(){
			this._ctrl = null;
			_LL.register(this);
		};
		_us.prototype = {
			init:function(ctrl){
				//set the sidebar service controller
				this._ctrl = ctrl;
			},
			onLocationChange:function(l,all){
				//on location change set the active application
				this._ctrl.setApp(l);
			},
		};

		return new _us;

	}])