var app = angular.module('warriorApp', ['firebase']);

// Exercise controller.


// Exercise controller.
app.controller("videoCtrl", function($scope, $firebase, $sce, $rootScope) {
  var ref = new Firebase("https://warriorsguidebook.firebaseio.com/videos");
  var videoList = $firebase(ref).$asArray();
  // On data load or change... do things.
  var authClient = new FirebaseSimpleLogin(ref, function(error, user) {
    console.log(user);
    if (error) {
    // an error occurred while attempting login
    console.log(error);
  } else if (user) {
    // user authenticated with Firebase
    console.log("User ID: " + user.uid + ", Provider: " + user.provider);
    videoList.$loaded(function() {
      $scope.videos = videoList;
    });

    $rootScope.user = true;

  } else {
    $rootScope.user = false;
  }
});

  $scope.login = function() {
    console.log(authClient);
    authClient.login('password', {
      email: $scope.newUser.email,
      password: $scope.newUser.password
    });
  }

  $scope.logout = function() {
    authClient.logout();
    location.reload(true);
  }

  $scope.saveVideo = function() {

    var stored = false;
    for (video in $scope.videos) {
      if ($scope.videos[video].youtubeID == $scope.newVideo.youtubeID) {
        $scope.stored = true;
      }
    }  

    if ($scope.stored) {
      alert("Video is already stored!")
    } else {
      videoList.$add($scope.newVideo);
    }
  }

  // Sanitize url.
  $scope.embedUrl = function (url) {
    return $sce.trustAsResourceUrl('https://www.youtube-nocookie.com/embed/' + url +
      '?autoplay=0&showinfo=0&autohide=1&rel=0');
  }

  $scope.deleteVideo = function(video) {
    videoList.$remove(video);
  }


});
