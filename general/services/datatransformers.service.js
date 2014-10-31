angular.module('General')
	.factory('general.DataTransformers', [function () {
		return {
			indexToId:function(items,index){
				return items[index].value;
			},
			idToIndex:function(items,id){
				for(var i=0;i<items.length;i++){
					if (items[i].value === id)
						return i;
				}
				return -1;
			},
			arrayToItems:function(array,lblField,valField){
				var items = [];
				for(var i=0;i<array.length;i++){
					items.push({
						label:array[i][lblField],
						value:array[i][valField]
					});
				}
				return items;
			},
			itemsToPermission:function(items){
				var s = 0;
				for(var i=0;i<items.length;i++){
					s = s | (items[i].value << i);
				}
				return s;
			}
		};
	}])