angular.module('General')
	.factory('general.GenericHttp', ['general.Http',function (_H) {
		return function(model){
			var _sj = function(){
				_H.call(this,model);
				this.byCompany=function(id,page){
					return this.by('company',id,page);
				}
			};
			inherits(_sj,_H);
			return new _sj;
		};
	}]);