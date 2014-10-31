angular.module('Ui')
	.directive('sidebar', [function () {
		return {
			restrict: 'A',
			controller: ['$scope','$location','ui.Sidebar',
				function($S,$L,_SB){
					this.app = '';
					this.open = function(app){
						this.app = app;
						$L.path('/'+app);
						//_TN.add(app);
					};
					this.setApp = function(app){
						this.app = app;
					};
					_SB.init(this);
				}],
			controllerAs:'sidebarCtrl',
			link: function ($S, $E, $A, $C) {
				
			}
		};
	}])