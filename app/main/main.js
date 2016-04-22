'use strict';
 
angular.module('myApp.main', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/main', {
        templateUrl: 'main/main.html',
        controller: 'MainCtrl'
    });
}])
 
.controller('MainCtrl', ['$scope','CommonProp','$firebase', function($scope,CommonProp,$firebase) {
 	
 	$scope.username = CommonProp.getUser();

 	if($scope.username == "")
 	{
 		console.log("please login");
 		return;
 	}
 	var firebaseObj = new Firebase("https://intense-fire-5714.firebaseio.com/Articles");
 	var sync = $firebase(firebaseObj.startAt($scope.username).endAt($scope.username));
 	$scope.articles = sync.$asArray();

 	$scope.editPost = function(id) {
    
	    var firebaseObj = new Firebase("https://intense-fire-5714.firebaseio.com/Articles/" + id);
	 
	    var syn = $firebase(firebaseObj);
	   
	    $scope.postToUpdate = syn.$asObject();
	 
	    $('#editModal').modal();      // triggers the modal pop up
	}

	$scope.update = function() {
	    var fb = new Firebase("https://intense-fire-5714.firebaseio.com/Articles/" + $scope.postToUpdate.$id);
	    var article = $firebase(fb);
	    article.$update({
	        title: $scope.postToUpdate.title,
	        post: $scope.postToUpdate.post,
	        emailId: $scope.postToUpdate.emailId
	    }).then(function(ref) {
	        $('#editModal').modal('hide');
	    }, function(error) {
	        console.log("Error:", error);
	    });
	}

	$scope.confirmDelete = function(id) {
        var fb = new Firebase("https://intense-fire-5714.firebaseio.com/Articles/" + id);
        var article = $firebase(fb);
        $scope.postToDelete = article.$asObject();
        $('#deleteModal').modal();
    }

    $scope.deletePost = function() {
        var fb = new Firebase("https://intense-fire-5714.firebaseio.com/Articles/" + $scope.postToDelete.$id);
        var article = $firebase(fb);
        article.$remove().then(function(ref) {
            $('#deleteModal').modal('hide');
        }, function(error) {
            console.log("Error:", error);
        });
    }

    $scope.logout = function(){
	    CommonProp.logoutUser();
	}

}]);