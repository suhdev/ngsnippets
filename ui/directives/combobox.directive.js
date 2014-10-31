	
angular.module('Ui')
	.directive('combobox', ['$timeout',function ($T) {
		return {
			templateUrl: '/templates/ui/combobox.template.html',
			restrict: 'A',
			priority:500,
			scope:{
				items:'=items',
				model:'=model',
				refresh:'&',
				eventsPrefix:'@'
			},
			controller:['$scope','$attrs', function($S,$A){
				
				UiCtrl.call(this,$S);
				var CTRL = this;
				this.index = 0;
				this.emitEvents = false;
				this.eventId = "ComboBoxChanged";
				
				$S.visible = false;

				$S.select = function(item,$index){
					CTRL.index = $index;
					CTRL.sItem = item;
					$S.model = item.id;
					$S.fieldValue = item[$S.valueField];
					$S.updateData();
					CTRL.trigger('ComboBoxChanged',{
						item:item,
						value:$S.fieldValue
					});
					if (CTRL.emitEvents){
						$S.$emit('ComboBox'+CTRL.emitEventId,{
							item:item,
							value:$S.fieldValue
						});
					}
					$S.toggleMenu();
				};

				this.up = function(){
					if (this.index == 0){
						this.index = $S.items.length -1;
						return;
					}
					this.index--;
					//$S.select($S.items[this.index],this.index);
					//$S.model = $S.items[this.index];
					//$S.fieldValue = $S.model[$S.valueField];
				};

				this.down = function(){
					if (this.index == $S.items.length -1){
						this.index = 0;
						return;
					}
					this.index++;
					//$S.select($S.items[this.index],this.index);
					//$S.model = $S.items[this.index];
					//$S.fieldValue = $S.model[$S.valueField];
				};

				$S.selectFromKb = function($event){
					if ($event.keyCode === 38){//up
						if (!$S.visible){
							$S.visible = true;
						}
						CTRL.up();
					}else if ($event.keyCode === 40){//down
						if (!$S.visible){
							$S.visible = true;
						}
						CTRL.down();
					}
					$event.stopPropagation();
				};

				$S.enterPressed = function(){
					$S.select($S.items[CTRL.index],CTRL.index);
				};

				$S.toggleMenu = function(evt){
					$S.visible = !$S.visible;
				};
				if (angular.isDefined($A['model'])){
					this.sItem = $S.items.findByField($S.valueField,$S.model);
					this.index = $S.items.indexOf($S.sItem);
				}

			}],
			controllerAs:'comboboxCtrl',
			link: {
				pre:function($S,$E,$A,$C){
					if (!angular.isDefined($A['labelField'])){
						$S.labelField = 'label';
					}else{
						$S.labelField = $A['labelField'];
					}
					if (!angular.isDefined($A['valueField'])){
						$S.valueField = 'value';
					}else{
						$S.valueField = $A['valueField'];
					}
					if (!angular.isDefined($A['fieldName'])){
						$S.fieldName = 'field';
					}else{
						$S.fieldName = $A.fieldName;
					}
				},
				post:function($S, $E, $A, $C) {
					if (angular.isDefined($A['events'])){
						$C.emitEvents = true;
						$C.emitEventId = $A['events'];
					}else{
						$C.emitEvents = false;
					}
					$S.$watch('model',function(newVal,oldVal){
						$C.sItem = $S.items.findByField($S.valueField,$S.model);
					});
				}
			}
		};
	}]);