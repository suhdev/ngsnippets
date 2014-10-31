angular.module('Ui')
	.directive('optionsGroup', [function () {
		return {
			restrict: 'A',
			templateUrl:'/templates/ui/optionsgroup.template.html',
			scope:{
				'model':'=model',
				'items':'=items',
				'refresh':'&refresh'
			},
			controller:['$scope','$timeout',function($S,$T){
				UiCtrl.call(this,$S);
				$S.select = function(i){
					$T(jQuery.proxy(function(){
						$S.model = i;
						$S.updateData();
					},this));
				};
				$S.isSelected = function(i){
					if ($S.model)
						return $S.model.value === i.value;
					return false;
				}
			}],
			controllerAs:'optionsGroupCtrl',
			link: function ($S, $E, $A) {
				
			}
		};
	}]);