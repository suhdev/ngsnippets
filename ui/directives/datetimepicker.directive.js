/**
 * @ngdoc directive
 * @name  Ui.datetimePicker 
 * @description  Represents a date/time picker ui component 
 */
angular.module('Ui')
	.directive('datetimePicker', ['$timeout',function ($T) {
		return {
			scope:{
				model:'=model',
				pickerType:'@pickerType',
			},
			controlelr:['$scope',function($S){

			}],
			controllerAs:'datetimePickerCtrl',
			restrict: 'A',
			link: function ($S, $E, $A) {
				var _op = {
					onChangeDateTime:function(dp,$input){
						$T(function(){
							$S.model = $input.val();
						});
					},
					format:'Y/m/d H:i'
				};
				if ($S.pickerType === 'time'){
					_op['datepicker'] = false;
					_op['format'] = 'H:i';
				}
				if ($S.pickerType === 'date'){
					_op['timepicker'] = false;
					_op['format'] = 'Y/m/d';
				}

				$E.datetimepicker(_op);

				$S.$watch('model',function(newVal,oldVal){
					$E.val(newVal);
				});
			}
		};
	}])