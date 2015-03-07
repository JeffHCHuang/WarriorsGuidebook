var app = angular.module('longSwordApp', ['firebase']);

// Exercise controller.


// Exercise controller.
app.controller("videoCtrl", function($scope, $firebase, $sce) {

  var ref = new Firebase("https://warriorsguidebook.firebaseio.com/videos");
  
  var videoList = $firebase(ref).$asArray();
  
  videoList.$loaded(function() {
    $scope.videos = videoList;
  });

  // Sanitize url.
  $scope.embedUrl = function (url) {
    return $sce.trustAsResourceUrl('https://www.youtube-nocookie.com/embed/' + url +
    '?autoplay=0&showinfo=0&autohide=1&rel=0');
  }


});
