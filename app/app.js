'use strict';
 
angular.module('myApp', [
    'ngRoute',
    'myApp.home',
    'myApp.register',
    'myApp.main',
    'myApp.addPost'       
]).
config(['$routeProvider', function($routeProvider) {
    // Set defualt view of our app to home
     
    $routeProvider.otherwise({
        redirectTo: '/home'
    });
}]);