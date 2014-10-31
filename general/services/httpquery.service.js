/**
 * @ngdoc service
 * @name general.HttpQuery
 * @description
 * Provides a way to request resources from the server using a chain pattern
 * @requires  general.DeferredRequest
 */
angular.module('General')
	.factory('general.HttpQuery', ['general.DeferredRequest',
		function (_RQ) {
		var _r = function(url){
			this._orderBy = [];
			this._url = '/'+url+'-:p-:c/:method/:id';
		};
		var c = _r.prototype;
		c.by = function(m){
			this._url = this._url.replace(/:method/,m);
			return this;
		};
		c.byId = function(byId){
			this._url = this._url.replace(/:id/,byId);
			return this;
		};
		c.orderBy = function(orderBy,direction){
			var _d = direction || 'asc';
			this._orderBy.push(orderBy+':'+_d);
			return this;
		};
		c.where = function(key,operator,value){
			this._where = this._where || {};
			if (typeof operator !== 'undefined' &&
				typeof value !== 'undefined'){
				this._where[key] = [operator,value];
			}else if (typeof operator !== 'undefined'){
				this._where[key] = ['=',operator];
			}
			return this;
		};
		c.whereBetween = function(key,start,end){
			this._whereBetween = this._whereBetween || {};
			if (typeof start !== 'undefined' && 
				typeof end !== 'undefined'){
				this._whereBetween[key] = [start,end];
			}
			return this;
		};
		c.whereIn = function(key,inArray){
			this._whereIn = this._whereIn || {};
			if (typeof inArray !== 'undefined'){
				this._whereIn[key] = inArray;
			}
			return this;
		};
		c.page = function(page){
			this._url = this._url.replace(/:p/,page);
			return this;
		};
		c.chunk = function(chunk){
			this._url = this._url.replace(/:c/,chunk);
			return this;
		};
		c.send = function(){
			var url = this._url
				.replace(/:p/,0)
				.replace(/:c/,20)
				.replace(/:orderBy/,'id')
				.replace(/:direction/,'asc')
				.replace(/:method/,'index')
				.replace(/:id/,'');
			if (url.lastIndexOf('/') === (url.length -1)){
				url = url.substr(0,url.length-1);
			}
			var w = this._where || {};
			var wIn = this._whereIn || {};
			var wBetween = this._whereBetween || {};
			return _RQ('post',url,{
				where:w,
				orderby: this._orderBy,
				whereIn:wIn,
				whereBetween:wBetween
			});
		};
		
		return function(model){
			return new _r(model);
		}
	}])