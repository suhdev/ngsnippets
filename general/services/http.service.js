/**
 * @ngdoc service
 * @name general.Http
 * @description
 * Provides an object to create network resources
 * @requires  general.DeferredRequest
 */
angular.module('General')
	.factory('general.Http', ['general.DeferredRequest','general.HttpQuery',
		function (_RQ,_HQ) {
		var _R = function(model,fields){
			this.model = model;
			this.resource = model.toCamelCase().capitalize();
			this._fields = fields;
			this._url = '/'+model+'/:id';
			this._extUrl = '/'+model+'-:p-:c/:orderBy-:direction/:method/:id';
		};
		var c = _R.prototype;
		/**
		 * @ngdoc method
		 * @name general.Http#perpareUrl
		 * @description prepares the URL for the request
		 * @methodOf general.Http
		 * @param {string} method the method to request
		 * @param {Number} methodId the method id to request
		 * @param {Number} page the page no defaults to 0
		 * @param {Number} chunk the request chunk size in 
		 * cases of arrays defaults to 20
		 */
		c.prepareUrl = function(method,id,page,chunk,orderBy,direction){
			var _page = page || 0;
			var _chunk = chunk || 20;
			var _orderBy = orderBy || 'id';
			var _direction = direction || 'asc';
			return this._extUrl
				.replace(/:method/,method)
				.replace(/:id/,id)
				.replace(/:p/,_page)
				.replace(/:c/,_chunk)
				.replace(/:orderBy/,_orderBy)
				.replace(/:direction/,_direction)
				.replace(/\/$/,'');
		};
		c.fields = function(){
			this._fields;
		};



		c.createLocalObject = function(obj){
			var ob = obj || {};
			var o = {};
			var elems = [];
			var key = '';
			for (var i=0;i<this._fields.length;i++){
				key = this._fields[i];
				elems = key.split(':');
				if (elems.length < 3){
					o[elems[0].toCamelCase()] = ob[elems[0]] || elems[1] || '';
				}else{
					switch(elems[1]){
						case 'int':
							o[elems[0].toCamelCase()] = ob[elems[0]] || parseInt(elems[2]) || 0;
						break;
						case 'float':
							o[elems[0].toCamelCase()] = ob[elems[0]] || parseFloat(elems[2]) || 0;
						break;
						case 'json':
							o[elems[0].toCamelCase()] = ob[elems[0]] || JSON.parse(elems[2]) || {};
						break;
						default:
							o[elems[0].toCamelCase()] = ob[elems[0]] || elems[2] || '';
					}
				}
			}
			return o;
		};
		c.createRemoteObject = function(obj){
			var ob = obj || {};
			var o = {};
			var key = '';
			for(var i=0;i<this._fields.length;i++){
				key = this._fields[i];
				o[key] = ob[key.toCamelCase()] || '';
			}
			return o;
		};
		/**
		 * @ngdoc method
		 * @name general.Http#get
		 * @description returns a single resource from the server given its id.
		 * @methodOf general.Http
		 * @param {Number} id the id of the resource to get
		 * @returns {Promise} a promise that can be either 
		 * resolved with the requested data or 
		 * rejected with the reasons of failure
		 */
		c.get=function(id){
			return _RQ.call(this,'get',this._url.replace(/:id/,id));
		};

		c.getAll = function(_ids){
			return _RQ.call(this,'post',this.prepareUrl('get-all',''),{
				ids:_ids
			});
		};

		c.getByAuth = function(){
			return _RQ.call(this,'get',this._url.replace(/:id/,'auth'));
		};
		/**
		 * @ngdoc method
		 * @name general.Http#update
		 * @description returns 
		 * @methodOf general.Http
		 * @param {Number} id the id of the resource to update
		 * @param {obj} obj the object to send to the server
		 * @returns {Promise} a promise that is either resolved 
		 * with the updated object or rejected with an array of reasons.
		 */
		c.update=function(id,obj){
			return _RQ.call(this,'put',this._url.replace(/:id/,id),obj);
		};
		/**
		 * @ngdoc method
		 * @name general.Http#search
		 * @methodOf general.Http
		 * @description Searches the server for resources matching a textual value.
		 * @param {string} value the value to use as a needle 
		 * @param {obj} obj the object to send to the server
		 * @return {Promise} a promise that is either 
		 * resolved with an array of items matching the search 
		 * query or rejected with an array of reasons.
		 */
		c.search=function(value,page,chunk){
			return _RQ.call(this,'post',
				this.prepareUrl('search','',page,chunk),{
					query:value
				});
		};
		/**
		 * @ngdoc method
		 * @name general.Http#search
		 * @methodOf general.Http
		 * @description generic function to retrieve resources 
		 * using their parent objects.
		 * @param {string} value the value to use as a needle 
		 * @param {obj} obj the object to send to the server
		 * @return {Promise} a promise that is either resolved with 
		 * an array of items matching the search query or 
		 * rejected with an array of reasons.
		 */
		c.by=function(by,id,page,chunk){
			return _RQ.call(this,'get',this.prepareUrl(by,id,page,chunk));
		};
		/**
		 * @ngdoc method
		 * @name general.Http#kill
		 * @description removes a resource from the server given its id.
		 * @methodOf general.Http
		 * @param {number} id the id of the resource to delete
		 * @return {Promise} a promise that is either resolved 
		 * with the deleted resource or rejected with reasons.
		 */
		c.kill=function(id){
			return _RQ.call(this,'delete',this._url.replace(/:id/,id));
		};
		
		c.killAll = function(_ids){
			return _RQ.call(this,'post',this.prepareUrl('delete-all',''),{
				ids:_ids
			});
		};
		/**
		 * @ngdoc method
		 * @name general.Http#create
		 * @description creates a new resource
		 * @methodOf general.Http
		 * @param {object} obj the object to create
		 * @return {Promise} a promise that is either resolved with 
		 * the created resource with id or rejected with reasons.
		 */
		c.create=function(obj){
			return _RQ.call(this,'post',this._url.replace(/:id/,'create'),obj);
		};
		/**
		 * @ngdoc method
		 * @name general.Http#byAny
		 * @methodOf general.Http
		 * @description retrieves resources that matches a given 
		 * key => value dictionary
		 * @param {object} byObj a dictionary used as matching criteria
		 * @param {number} page the page of the results (defaults to 0)
		 * @param {number} chunk the chunk size of result (defaults to 20)
		 * @return {Promise} a promise that is either resolved 
		 * with an array of items matching the byObj query or 
		 * rejected with an array of reasons.
		 */
		c.byAny = function(byObj,page,chunk){
			return _RQ.call(this,'post',this.prepareUrl('any','',page,chunk),byObj);
		};

		c.index = function(page,chunk){
			return _RQ.call(this,'get',this.prepareUrl('index','',page,chunk));
		};

		c.select = function(page,chunk){
			return _RQ.call(this,'get',this.prepareUrl('select','',page,chunk));
		};
		/**
		 * @ngdoc method
		 * @name general.Http#query
		 * @methodOf general.Http
		 * @description retrieves resources by a given 
		 * @param {number} page the page no. to get (defaults to 0)
		 * @param {number} chunk the chunk size of the results (defaults to 20)
		 * @return {Promise} a promise that is either resolved with 
		 * an array of items matching the search query or rejected 
		 * with an array of reasons.
		 */
		c.query = function(page,chunk){
			return _HQ(this.model);
			//return _RQ.call(this,'get',this.prepareUrl('all','',page,chunk));
		};

		
		return _R;
	}])