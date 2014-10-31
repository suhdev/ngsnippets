angular.module('Ui')
	.directive('toast', function () {
		return {
			restrict: 'A',
			replace:true,
			controller:['$scope','$q','ui.Toast',function($S,$Q,_T){
				$S.visible = false;
				$S.progress = false;
				$S.text = '';
				
				$S.show = function(){
					$S.visible = true;
					return $S;
				};
				$S.setText = function(t){
					$S.text = t;
					return $S;
				};
				$S.hide = function(){
					$S.visible = false;
					$S.progress = false;
					return $S;
				};
				$S.setProgress = function(p){
					$S.progress = (p != -1)?p:false;
					return $S;
				};
				
				_T.init($S);
				
			}],
			controllerAs:'toastCtrl',
			templateUrl:'/templates/ui/toast.template.html',
			link: function ($S, $E, $A){
				
			}
		};
	});