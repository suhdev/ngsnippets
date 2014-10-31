angular.module('General')
	.controller('SuhailCtrl', ['$scope', function ($S) {
		Ctrl.call(this,'suhail','Suhail','fa-tachometer','/templates/app/dashboard.template.html');
		console.log('hey there');
	}]);