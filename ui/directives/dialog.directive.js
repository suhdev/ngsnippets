angular.module('Ui')
	.directive('dialog', [function () {
		return {
			restrict: 'A',
			priority:0,
			replace:true,
			templateUrl:'/templates/ui/dialog.template.html',
			scope:true,
			controller:['$scope','ui.Dialog', function($S,_UD){
				$S.title = '';
				$S.content = null;
				$S.buttons = [];
				$S.templateUrl = null;
				$S.visible = false;

				$S.show = function(){
					$S.visible = true;
				};

				$S.hide = function(){
					$S.visible = false;
					$S.title = null;
					$S.content = null;
					$S.templateUrl = null;
					$S.buttons = [];
				};

				$S.answer = function($index){
					$S.hide();
					_UD.answer($index);
				};
				_UD.init($S);
			}],
			controllerAs:'dialogCtrl',
			link: function ($S, $E, $A) {
				$E.draggable({
					handle:$E.find('.ui-dialog-heading').get(0)
				});
			}
		};
	}])