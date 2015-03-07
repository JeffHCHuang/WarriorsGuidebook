var app = angular.module('startPage', ['firebase']);

app.controller("startCtrl", function($scope, $firebase, $rootScope){
	var ref = new Firebase("https://warriorsguidebook.firebaseio.com/studentProfiles");
	var auth = new FirebaseSimpleLogin(ref, function(error, user) {
		if (error) {
			console.log(user);
		} else if (user) {
			console.log(user);
			$scope.forceChange();
			var msg = document.getElementById("welcomeMessage");
			msg.innerHTML = "Greetings, Warrior " + user.thirdPartyUserData.first_name + "!";
		} else {
			console.log("You are logged out!");
			$rootScope.loggedIn = false;
			var msg = document.getElementById("welcomeMessage");
			msg.innerHTML = "";
		}
	});

	$scope.login = function() {
		console.log(auth);
		auth.login('facebook').then($scope.forceChange);
	}

	$scope.logout = function() {
		console.log(auth);
		auth.logout();
		location.reload(true);
		$rootScope.loggedIn = false;
	}

	$scope.forceChange = function(user) {
		$scope.$apply(function() {
			$rootScope.loggedIn = true;
		}
	)};

	});