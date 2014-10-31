angular.module('Ui')
	.directive('checkbox', [function () {
		return {
			restrict: 'A',
			templateUrl:'/templates/ui/checkbox.template.html',
			controller:['$scope','$timeout',function($S,$T){
				UiCtrl.call(this,$S);
				$S.value = false;
				

				$S.toggle = function(){
					$S.value = !$S.value;
					$T(function(){
						$S.model = $S.value;	
						$S.updateData();
					});
				};
			}],
			scope:{
				model:'=model',
				lbl:'=label',
				strLabel:'@',
				refresh:'&'
			},
			controllerAs:'checkboxCtrl',
			link: function ($S, $E, $A, $C) {
				$S.value = $S.model;
				if (typeof $S.lbl !== 'undefined')
					$S.label = $S.lbl;
				else if (typeof $S.strLabel !== 'undefined')
					$S.label = $S.strLabel;
			}
		};
	}])