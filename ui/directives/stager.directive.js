angular.module('Ui')
	.directive('stager', [function () {
		return {
			restrict: 'A',
			templateUrl:'/templates/ui/stager.template.html',
			scope:{
				stages:'=',
				activeStage:'=',
				goBack:'=',
				goForward:'='
			},
			controller:['$scope',function($S){
				$S.changeStage = function($index){
					$S.activeStage = $index;
				}
			}],
			link: function ($S, $E, $A) {
				
			}
		};
	}])