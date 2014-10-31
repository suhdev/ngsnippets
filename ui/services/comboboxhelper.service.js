angular.module('Ui')
	.factory('ui.ComboboxHelper', [function () {
		return function(items,value){
			for (var i=0;i<items.length;i++){
				console.log('Value: '+value);
				console.log('Items[i].value: '+items[i].value);
				if (items[i].value === value){
					console.log('Found');
					return i;
				}
			}
			return -1;
		}
	}]);