'use strict';
 
angular.module('myApp', [
    'ngRoute',
    'myApp.home',
    'myApp.register',
    'myApp.welcome',
    'myApp.addPost'       
]).
config(['$routeProvider', function($routeProvider) {
    // Set defualt view of our app to home
     
    $routeProvider.otherwise({
        redirectTo: '/home'
    });
}]);