/**
 * @ngdoc overview
 * @name Ui
 * @description
 * Contains ui services, directives, controllers. 
 * @requires General
 */
angular.module('Ui',['General'])
.config(['$interpolateProvider','$locationProvider',
    function($IP,$LP,$RP){
        $IP.startSymbol('<%').endSymbol('%>');
    }
]);