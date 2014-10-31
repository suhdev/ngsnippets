angular.module('Ui')
	.directive('multiCombobox', ['$timeout',function ($T) {
		return {
			restrict: 'A',
			templateUrl:'/templates/ui/multicombobox.template.html',
			priority:0,
			scope:{
				items:'=items',
				model:'=model',
				refresh:'&',
			},
			controller:['$scope',function($S){
				UiCtrl.call(this,$S);
				$S.isSelected = function(item){
					if (typeof $S.model !== 'undefined')
						return $S.model.indexOf(item) !== -1;
					return false;
				};

				$S.select = function(item){
					if ($S.isSelected(item)){
						var idx = $S.model.indexOf(item);
						$S.model.splice(idx,1);
					}else{
						$S.model.push(item);
					}
					
					$S.updateData();
				};
			}],
			controllerAs:'multiComboboxCtrl',
			link: function ($S, $E, $A, $C) {
				$S.$watch('model',function(newVal,oldVal){
					$E.find('.multi-list').scrollTop(0);	
				});
			}
		};
	}]);