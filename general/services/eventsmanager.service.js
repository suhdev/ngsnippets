angular.module("General")
	.factory('general.EventsManager', ['$rootScope','general.IdentityGenerator','general.Exception',function ($RT,_GIG,_GE) {
		var t = function(){
			this._e = {};
		};
		t.prototype = {
			addListener:function(l){
				if (l.listenEvents){
					var events = l.listenEvents();
					for(var i=0;i<events.length;i++){
						var c = events[i];
						this._e[c] = this._e[c] || {};
						if (l.identity){
							this._e[c][l.identity()] = l;
						}else{
							throw _GE(0x1,'No identity');
						}
						
					}
				}
			},
			removeListener:function(l,e){
				if (l.listenEvents){
					if (angular.isDefined(e)){
						delete this._e[e][l.identity()];
						return;
					}
					var events = l.listenEvents();
					for(var i=0;i<events.length;i++){
						delete this._e[events[i]][l.identity()];
					}
				}
			},
			listen:function(eN,l){
				if (arguments.length == 2){
					this._e[eN] = this._e[eN] || {};
					this._e[eN][l.identity()];
				}else if(arguments.length == 1){
					this.addListener(eN);
				}
			},
			trigger:function(eN,eD){
				if (this._e[eN]){
					for(var k in this._e[eN]){
						this._e[eN][k].fire(eN,eD);
					}
				}
			},
			unlisten:function(eN,l){
				if (angular.isDefined(this._e[eN]) &&
					angular.isDefined(this._e[l.identity()])){
					delete this._e[eN][l.identity()];
				}
			}
		};	
		return new t;
	}]);