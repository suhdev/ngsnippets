/**
 * @ngdoc overview
 * @name General
 * @description
 * <p>Contains general services, directives, controllers.
 * These are used across the website.</p>
 * @requires ngAnimate
 * @requires ngSanitize
 * @requires ngRoute
 */
angular.module('General',['ngAnimate','ngSanitize', 'ngRoute'])
.config(['$interpolateProvider','$locationProvider',
    function($IP,$LP,$RP){
        $IP.startSymbol('<%').endSymbol('%>');
    }
]);