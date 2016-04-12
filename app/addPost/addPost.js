'use strict';
 
angular.module('myApp.addPost', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/addPost', {
        templateUrl: 'addPost/addPost.html',
        controller: 'AddPostCtrl'
    });
}])
	
.controller('AddPostCtrl', ['$scope','$firebase',function($scope,$firebase) {
 
 	var firebaseObj = new Firebase("https://intense-fire-5714.firebaseio.com");
 	var fb = $firebase(firebaseObj); 
}]);