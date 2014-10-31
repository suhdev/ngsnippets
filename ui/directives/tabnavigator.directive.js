/**
 * @ngdoc directive
 * @name Ui.directive:tabNavigator
 * @description
 * Manages the tab navigation system
 */
angular.module('Ui')
	.directive('tabNavigator', [function () {
		return {
			restrict: 'A',
			/**
			 * @ngdoc object
			 * @name Ui.controller:TabNavigatorCtrl
			 * @description
			 * Controller attached to the tabNavigator directive
			 */
			controller:['$scope','$location','ui.TabNavigator','ui.Toast',
			function($S,$L,_TN,_T){
				//tabs array
				this.tabs = [];
				//tab keys dictionary
				this.tabKeys = [];
				//selected tab index
				this.selIdx = -1;
				/**
				 * @ngdoc method
				 * @name Ui.controller:TabNavigatorCtrl#save
				 * @param {string} key the application key
				 * @param {Array} app the application array @link General.service:Apps
				 * @methodOf Ui.controller:TabNavigatorCtrl
				 * @description
				 * Adds a tab to the tab navigator
				 */
				this.add = function(key,app){
					//set the key : index value in the keys dictionary
					//this is useful in removing tabs by key
					this.tabKeys.push(key);
					//create and add the new tab to the tabs array
					this.tabs.push({
						id:key,
						label:app[1],
						icon:app[2],
						templateUrl:app[3]
					});
					//invoke persistance
					_TN.persist();
				};
				this.exists = function(key){
					return (this.tabKeys.indexOf(key) !== -1);
				};

				this.removeAt = function(index){
					if (this.tabs.length > 1){
						var t = this.tabs.splice(index,1);
						this.tabKeys.splice(index,1);
						if (index == this.tabs.length){
							this.tab(this.tabs.length-1);
						}else if (index == 0){
							this.tab(0);
						}else{
							this.tab(index-1);
						}
						_TN.persist();
						return true;
					}
					return false;
				};
				this.indexOf = function(key){
					return this.tabKeys.indexOf(key);
				},
				this.remove = function(key){
					var index = this.tabKeys.indexOf(key);
					if (index !== -1)
						return this.removeAt(index);
					return false;
				};

				this.tab = function(index){
					var idx = index;
					if (!angular.isNumber(index)){
						idx = this.tabKeys.indexOf(index);
					}
					if (idx !== -1){
						this.selIdx = idx;
						$L.path('/'+this.tabs[idx].id);
						_TN.persist();
						$S.$broadcast('TabNavigator.SelectedTabChanged', {
							tabKey:this.tabKeys[this.selIndex]
						});
						return this.tabs[idx];
						
					}else{
						return null;
					}
				};

				this.getSelectedTab = function(){
					return this.selIdx;
				};

				_TN.init(this);

			}],
			controllerAs:'tabNavigatorCtrl',
			link: function (scope, iElement, iAttrs) {
				window.t = scope;
			}
		};
	}])