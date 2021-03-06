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
.controller('HomeCtrl', ['$scope','$location','$firebaseAuth','CommonProp',function($scope,$location,$firebaseAuth,CommonProp) {
    
    var firebaseObj = new Firebase("https://intense-fire-5714.firebaseio.com"); 
    var loginObj = $firebaseAuth(firebaseObj);

    var login = {};
 
    $scope.login = login;

    $scope.SignIn = function(user) 
    {
        event.preventDefault();  // To prevent form refresh
        var username =  user.email;
        var password =  user.password;
        login.loading = true;
        console.log("email" + user.email)
        loginObj.$authWithPassword ({
                email: username,
                password: password
            })
            .then(function(user) {
                // Success callback
                console.log('Authentication successful');
                CommonProp.setUser(user.password.email);
                login.loading = false;
                $location.path('/main');
            }, function(error) {
                // Failure callback
                console.log('Authentication failure');
                login.loading = false;
            });
        
     
    // Auth Logic will be here
    }
}])

.service('CommonProp',['$location','$firebaseAuth',function($location,$firebaseAuth) {
    var user = '';
    var firebaseObj = new Firebase("https://intense-fire-5714.firebaseio.com");
    var loginObj = $firebaseAuth(firebaseObj);
  
    return {
        getUser: function() {
            if(user == ''){
                user = localStorage.getItem('userEmail');
            }
            return user;
        },
        setUser: function(value) {
            localStorage.setItem("userEmail", value);
            user = value;    
        },
        logoutUser:function(){
            console.log("log out");
            loginObj.$unauth();
            user='';
            localStorage.removeItem('userEmail');
            $location.path('/home');
        }
    };
}])

.directive('laddaLoading', [
    function() {
        return {
            link: function(scope, element, attrs) {
                var Ladda = window.Ladda;
                var ladda = Ladda.create(element[0]);
                // Watching login.loading for change
                scope.$watch(attrs.laddaLoading, function(newVal, oldVal) {
                    // Based on the value start and stop the indicator
                    if (newVal) {
                        ladda.start();
                    } else {
                        ladda.stop();
                    }
                });
            }
        };
    }
]);