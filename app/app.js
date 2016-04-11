'use strict';
 
angular.module('myApp', [
    'ngRoute',
    'myApp.home',
    'myApp.register'           // Newly added register module
]).
config(['$routeProvider', function($routeProvider) {
    // Set defualt view of our app to home
     
    $routeProvider.otherwise({
        redirectTo: '/home'
    });
}]);