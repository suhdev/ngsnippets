/**
 * @ngdoc service
 * @name general.Apps
 * @description
 * The application apps registry
 * @requires General.Exception
 */
angular.module('General')
	.factory('general.Apps', ['general.Exception',function (_GE) {
		var _ga = function(){
			/**
			 * @ngdoc property
			 * @name general.Apps.#apps
			 * @propertyOf general.Apps
			 * @description
			 * Holds the applications registry dictionary. 
			 * All applications needs to include an entry in the registry in order to 
			 * be invoked by sidebars and the tab navigator.
			 */
			this.apps = {
				'dashboard':['DashboardCtrl','Dashboard','fa-tachometer','/templates/app/dashboard.template.html'],
				'profile':['ProfileCtrl','Profile','fa-user','/templates/app/profile.template.html'],
				'tasks':['TasksCtrl','Tasks','fa-tasks','/templates/app/tasks.template.html'],
				'tasks-diagram':['TasksDiagramCtrl','Tasks Diagram','fa-sitemap','/templates/app/tasksdiagram.template.html'],
				'staff':['StaffCtrl','Staff','fa-users','/templates/app/staff.template.html'],
				'clients':['ClientsAppCtrl','Clients','fa-folder','/templates/app/clients.template.html'],
				'company':['CompanyAppCtrl','Company','fa-folder','/templates/app/company.template.html'],
				'jobs':['JobsAppCtrl','Jobs','fa-folder','/templates/app/jobs.template.html'],
				'task-types':['TaskTypesAppCtrl','Task Types','fa-folder','/templates/app/tasktypes.template.html'],
				'my-tasks':['MyTasksAppCtrl','My Tasks','fa-tasks','/templates/app/mytasks.template.html'],
				'projects':['ProjectsAppCtrl','Projects','fa-rocket','/templates/app/projects.template.html'],
				'teams':['TeamsAppCtrl','Teams','fa-rocket','/templates/app/teams.template.html'],
				'departments':['DepartmentsAppCtrl','Departments','fa-rocket','/templates/app/departments.template.html'],
			};
		};

		_ga.prototype = {
			/**
			 * @ngdoc method
			 * @name general.Apps#get
			 * @param {string} key the application key
			 * @returns {Array} application array 
			 * @methodOf general.Apps
			 * @description
			 * Returns the appliaction array which follows the following format:
			 * ['AppMainController','App Label','App Icon', 'App Template'];
			 */
			get:function(key){
				if (this.exists(key))
					return this.apps[key];
				else
					throw new _GE(0x01,'The app with key ('+key+') does not exist');
			},
			/**
			 * @ngdoc method
			 * @name general.Apps#exists
			 * @param {string} key the application key
			 * @returns {bool} true if the application exists, false otherwise
			 * @methodOf general.Apps
			 * @description
			 * Checks whether an application is registered with the application registery 
			 */
			exists:function(key){
				return typeof this.apps[key] !== 'undefined';
			}
		};
		return new _ga;
	}])