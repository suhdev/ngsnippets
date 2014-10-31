angular.module('Ui')
	.directive('stagedForm', [function () {
		return {
			restrict: 'A',
			scope:{
				stages:'=',
				activeStage:'=',
				goBack:'=',
				goForward:'=',
				goTo:'&'
			},
			controller:['$scope',function($S){

			}],
			link: function ($S, $E, $A) {
				
			}
		};
	}])