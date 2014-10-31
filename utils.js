var __odf = Object.defineProperty;
__odf(Object.prototype,'getDataAt',{
	enumerable:false,
	configurable:false,
	value:function(k){
		var p = k.match(/[^\.]+/gi);
		var t = this;
		for(var i=0;i<p.length;i++){
			t = t[p[i]];
		}
		return t; 
	},
	writable:false,
});

__odf(Object.prototype,'setDataAt',{
	enumerable:false,
	configurable:false,
	value:function(k,v){
		var p = k.match(/[^\.]+/gi);
		var t = this;
		for(var i=0;i<p.length-1;i++){
			t = t[p[i]];
		}
		t[p[p.length-1]] = v;
		return t; 
	},
	writable:false,
});

__odf(Array.prototype,'findByField',{
	enumerable:false,
	configurable:false,
	value:function(f,v){
		for(var i =0;i<this.length;i++){
	        if (this[i][f] == v)
	            return this[i];
	    }
	    return false;
	}
});

__odf(Array.prototype,'findAllByField',{
	enumerable:false,
	configurable:false,
	value:function(f,v){
		var r = [];
		for(var i =0;i<this.length;i++){
	        if (this[i][f] == v)
	            r.push(this[i]);
	    }
	    return r;
	}
});

__odf(Array.prototype,'findIndexByField',{
	enumerable:false,
	configurable:false,
	value:function(f,v){
		for(var i =0;i<this.length;i++){
	        if (this[i][f] == v)
	            return i;
		}
		return -1;
	}
});

__odf(Array.prototype,'existsByField',{
	enumerable:false,
	configurable:false,
	value:function(f,v){
		for(var i =0;i<this.length;i++){
	        if (this[i][f] == v)
	            return true;
		}
		return false;
	}
});

__odf(Array.prototype,'removeAllByField',{
	enumerable:false,
	configurable:false,
	value:function(f,v){
		var list = [];
		for(var i =0;i<this.length;i++){
	        if (this[i][f] == v){
	        	list.push(this.splice(i,1));
	        	i--;
	        }
		}
		return list;
	}
});

__odf(String.prototype,'capitalize',{
	enumerable:false,
	configurable:false,
	value:function(){
		return this.charAt(0).toUpperCase()+this.slice(1);
	}
});

__odf(String.prototype,'lowerize',{
	enumerable:false,
	configurable:false,
	value:function(){
		return this.charAt(0).toLowerCase()+this.slice(1);
	}
});

__odf(String.prototype,'toCamelCase',{
	enumerable:false,
	configurable:false,
	value:function(){
		var m = this.match(/[a-zA-Z0-9]+/g);
	    var t = m[0].lowerize();
	    for(var i=1;i<m.length;i++){
	        t = t+ m[i].capitalize();
	    }
	    return t;
	}
});

__odf(Array.prototype,'excludeByField',{
	enumerable:false,
	configurable:false,
	value:function(f,v){
		var a = [];
		for(var i=0;i<this.length;i++){
			var item = this[i].getDataAt(f);
			if (item != v){
				a.push(this[i]);
			}
		}
	    return a;
	}
});

__odf(Array.prototype,'excludeByArrayField',{
	enumerable:false,
	configurable:false,
	value:function(af,f,v){
		var a = [];
		for(var i=0;i<this.length;i++){
			var item = this[i].getDataAt(af);
			var idx = item.findByField(f,v);
			if (!idx){
				a.push(this[i]);
			}
		}
	    return a;
	}
});

__odf(String.prototype,'toSnakeCase',{
	enumerable:false,
	configurable:false,
	value:function(){
		var m = this.match(/[A-Z]?[a-z0-9]+(?=[A-Z])?/g);
		var t = '';
		if (m.length > 0){
			t = m[0].toLowerCase();
			for(var i=1;i<m.length;i++){
				t = t +'_'+m[i].toLowerCase();
			}
		}
	    return t;
	}
});

__odf(Object.prototype,'inherits',{
	enumerable:false,
	configurable:false,
	value:function(p){
		function _t() {

		};
		_t.prototype = p.prototype;
		this.prototype = new _t();
		this.prototype.constructor = this.constructor;
	}
});

function inherits(childCtor,parentCtor){
	function tempCtor() {

	};
	tempCtor.prototype = parentCtor.prototype;
	childCtor.prototype = new tempCtor();
	childCtor.prototype.constructor = childCtor.constructor;
};

function provide(path){
	var parts = path.split('.');
	if (parts.length > 0){
		var p = window;
		for(var i=0;i<parts.length;i++){
			if (typeof p[parts[i]] === 'undefined')
				p[parts[i]] = {};
			p = p[parts[i]];
		}
		return p;
	}
	return false;
};