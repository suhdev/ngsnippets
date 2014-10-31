/**
 * @ngdoc service
 * @name  ui.Dialog
 * @description provides a unified dialog box for the user. 
 * @requires $q
 */
angular.module('Ui')
	.factory('ui.Dialog', ['$q',function ($Q) {
		var _ud = function(){
			this._ctrl = null;
			this._df = null;
		};
		_ud.prototype = {
			/**
			 * @ngdoc method
			 * @name ui.Dialog#init
			 * @description Initializes the dialog service with the DOM controller
			 * @methodOf ui.Dialog
			 * @param {ui.DialogCtrl} ctrl the dialog controller 
			 */
			init:function(ctrl){
				this._ctrl = ctrl;
			},
			/**
			 * @ngdoc method
			 * @name ui.Dialog#title
			 * @description Sets the dialog title
			 * @methodOf ui.Dialog
			 * @param {string} title the dialog controller 
			 * @returns {ui.Dialog} the ui.Dialog instance
			 */
			title:function(title){
				this._ctrl.title = title;
				return this;
			},
			/**
			 * @ngdoc method
			 * @name ui.Dialog#content
			 * @description sets the content of the dialog
			 * @methodOf ui.Dialog
			 * @param  {string} content the content for the dialog
			 * @returns {ui.Dialog} the ui.Dialog instance
			 */
			content:function(content){
				this._ctrl.content = content;
				return this;
			},
			/**
			 * @ngdoc method
			 * @name ui.Dialog#templateUrl
			 * @description sets the template URL to fetch as the content of the dialog
			 * @methodOf ui.Dialog
			 * @param {string} url the template URL
			 * @returns {ui.Dialog} the ui.Dialog instance
			 */
			templateUrl:function(url){
				this._ctrl.templateUrl = url;
				return this;
			},
			/**
			 * @ngdoc method
			 * @name ui.Dialog#buttons
			 * @description sets the dialog buttons 
			 * @methodOf ui.Dialog
			 * @param {Array} bs array of button titles
			 */
			buttons:function(bs){
				this._ctrl.buttons = bs;
				return this;
			},
			/**
			 * @ngdoc method
			 * @name ui.Dialog#show
			 * @description Initializes the dialog service with the DOM controller
			 * @methodOf ui.Dialog
			 * @returns {Promise} a deferred object that is resolved when one of 
			 * the buttons is clicked or the dialog close button is clicked.
			 */
			show:function(){
				this._df = $Q.defer();
				this._ctrl.show();
				return this._df.promise;
			},
			/**
			 * @ngdoc method
			 * @name ui.Dialog#answer
			 * @description invoked when the buttons are clicked, and it is passed the index of the button. 
			 * This function resolves the internal deferred object passing in the index of the clicked button.
			 * @methodOf ui.Dialog
			 * @param  {number} index index of the button that has been clicked
			 */
			answer:function(index){
				this._df.resolve(index);
			},
			/**
			 * @ngdoc method
			 * @name ui.Dialog#close
			 * @description Closes the dialog and resolving the internal deferred object with the index -1. 
			 * @methodOf ui.Dialog
			 */
			close:function(){
				this._df.resolve(-1);
			}
		};
	
		return new _ud;
	}])