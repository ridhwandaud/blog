'use strict';
 
angular.module('myApp.addPost', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/addPost', {
        templateUrl: 'addPost/addPost.html',
        controller: 'AddPostCtrl'
    });
}])
	
.controller('AddPostCtrl', ['$scope','$firebase','CommonProp','$location',function($scope,$firebase,CommonProp,$location) {
 
 	var firebaseObj = new Firebase("https://intense-fire-5714.firebaseio.com/Articles");
 	var fb = $firebase(firebaseObj);

 	 $scope.AddPost = function() {
         
      	// Add Post logic will be here
    	var title = $scope.article.title;
		var post = $scope.article.post;

		var user = CommonProp.getUser();

		fb.$push({
		    title: title,
		    post: post,
		     emailId: user,
    		'.priority': user
		}).then(function(ref) {
		    $location.path('/welcome');
		}, function(error) {
		    console.log("Error:", error);
		});  
    }

    $scope.logout = function(){
	    CommonProp.logoutUser();
	}




}]);