'use strict';
 
angular.module('myApp.home', ['ngRoute','firebase'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}])
 
// Home controller
.controller('HomeCtrl', ['$scope','$firebaseSimpleLogin',function($scope,$firebaseSimpleLogin) {
    
    var firebaseObj = new Firebase("https://intense-fire-5714.firebaseio.com"); 
    var loginObj = $firebaseSimpleLogin(firebaseObj);
    $scope.SignIn = function(user) 
    {
        event.preventDefault();  // To prevent form refresh
        var username =  user.email;
        var password =  user.password;
        
        loginObj.$login('password', {
                email: username,
                password: password
            })
            .then(function(user) {
                // Success callback
                console.log('Authentication successful');
            }, function(error) {
                // Failure callback
                console.log('Authentication failure');
            });
        
     
    // Auth Logic will be here
    }
}]);