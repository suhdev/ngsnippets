angular.module('General')
	.factory('general.Util', [function () {
		return {
			searchArray:function(array,needle,key){
				for(var i=0;i<array.length;i++){
					if (array[i][key] === needle){
						return i;
					}
				}
				return -1;
			}
		};
	}]);