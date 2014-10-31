function DataCtrl($S,id,events){
	BasicCtrl.call(this,id,events);
	$S.mode = '';
	$S.showEditor = false;
	$S.editorTitle = '';

	this.onDataUpdate = function(key,value){
		var parts = key.split('.');
		if (parts.length > 0){
			var obj = $S;
			for(var i=0;i<parts.length;i++){
				obj = obj[parts[i]];
			}
			obj = value;
		}
	};

	this.editorTitle = function(title){
		return this.generic.call($S,'editorTitle',title);
	};

	this.mode = function(mode){
		return this.generic.call($S,'mode',mode);
	};

	this.edit = function(item){

	};

	this.create = function(item){

	};

	this.hideEditor = function(){
		$S.showEditor = false;
	};

	this.remove = function(item){

	};

	this.isEditMode = function(){
		return $S.mode === 'edit';
	};

	this.performSave = function(mode,service,obj){
		if (mode === 'edit'){
			return service.update(obj.id,obj);
		}else{
			return service.create(obj);
		}
	};

};