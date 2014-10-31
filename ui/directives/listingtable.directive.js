angular.module('Ui')
	.directive('listingTable', [function () {
		return {
			restrict: 'A',
			templateUrl:'/templates/ui/listingtable.template.html',
			controller:['$scope', function($S){
				var ctrl = this;
				this.search = '';
				$S.included = function(key){
					if (angular.isDefined($S.include) && 
						angular.isArray($S.include)){
						return $S.include.indexOf(key) !== -1;
					}
					return true;
				};
				this.find = function(item){
					var regex = new RegExp(".*"+ctrl.search+".*","ig");
					if (ctrl.search.trim() !== ""){
						var t = JSON.stringify(item);
						return t.match(regex) != null;
					}
					return true;
				};
			}],
			controllerAs:'listingTableCtrl',
			scope:{
				'items':'=',
				'rm':'&remove',
				'ed':'&edit',
				'cr':'&create',
				'cols':'=',
				'controls':'@',
				'include':'='
			},
			link: function ($S, $E, $A, $C) {
				$S.controls = angular.isDefined($S.controls);
				if (angular.isDefined($S.rm())){
					$S.remove = function(item){
						$S.rm()(item);
					}	
				}
				if (angular.isDefined($S.cr())){
					$S.create = function(item){
						$S.cr()(item);
					};
				}
				if (angular.isDefined($S.ed())){
					$S.edit = function(item){
						$S.ed()(item);
					};
				}
				if (angular.isDefined($A['emptyIndex'])){
					$S.emptyIndex = 0;
				}else{
					$S.emptyIndex = -1;
				}
				if (angular.isDefined($A['search'])){
					$S.showSearch = true;
					$C.search = '';
				}else{
					$S.showSearch = false;
					$C.search = null;
				}

			}
		};
	}])