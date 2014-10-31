/**
 * @ngdoc directive
 * @name Ui.accordion
 * @description  a directive to provide accordion like functionality
 */
angular.module('Ui')
	.directive('accordion', [function () {
		return {
			priority: 500,
			templateUrl: '/templates/ui/accordion.template.html',
			restrict: 'A',
			scope: {
				items:'=items'
			},
			/**
			 * @ngdoc object
			 * @name  Ui.AccordionCtrl
			 * @description controls the behaviour of the accordion directive
			 */
			controller: ['$scope',function($S){
				this.items = $S.items;
				this.selIdx = 0;
				/**
				 * @ngdoc method
				 * @name Ui.AccordionCtrl#select
				 * @methodOf Ui.AccordionCtrl
				 * @description  sets the active section of the accordion
				 * @param {number} idx the index of the section to be active
				 */
				this.select = function(idx){
					this.selIdx = idx;
				};

				/**
				 * @ngdoc method
				 * @name Ui.AccordionCtrl#select
				 * @methodOf Ui.AccordionCtrl
				 * @description  checks if the section at the provided index is the active section
				 * @param {number} idx the index of the section to be checked
				 * @returns {bool} true if the section is active, false otherwise
				 */
				this.isSelected = function(idx){
					return this.selIdx == idx;
				};
			}],
			controllerAs:'accordionCtrl',
			link: function postLink(scope, iElement, iAttrs) {
	
			}
		};
	}])