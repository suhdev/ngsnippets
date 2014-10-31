angular.module('Ui')
	.factory('ui.Toast', ['$q','$timeout',function ($Q,$T) {
		var _ut = function(){
			//toast controller
			this._ctrl = null;
			//current object
			this._current = null;
			//toast queue 
			this._q = [];
		};
		_ut.prototype = {
			show:function(){
				this._ctrl.show();
			},
			init:function(c){
				this._ctrl = c;
			},
			hide:function(){
				this._ctrl.hide();
				this._current[0].resolve();
				this._toast();
			},
			toast:function(text,delay,progress){
				//set delay
				var del = delay || -1;
				//set progress
				var p = progress || -1;
				//create deferred
				var df = $Q.defer();
				//push to queue
				this._q.push([df,text,del,progress]);
				//initiate toast
				this._toast();
				//return deferred object
				return df.promise;
			},
			_toast:function(){
				if (this._q.length > 0){
					this._current = this._q.shift();
					//set toast settings
					this._ctrl
						.setText(this._current[1])
						.setProgress(this._current[3]);
					//show toast
					this.show();
					if (this._current[2] !== -1){
						$T(jQuery.proxy(this.hide,this),
							this._current[2]);
					}					
				}
			}
		};
		return new _ut;
	}])