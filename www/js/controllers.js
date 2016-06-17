var app = angular.module('tedrssapp.controllers', []);

app.controller('FeedCtrl', function ($scope, $q, $ionicLoading, FeedService, $timeout) {
	console.log("Loading FeedCtrl");

  //var deferred = $q.defer();
  //var promise = deferred.promise;

  $ionicLoading.show({template:'Loading feed...'});
  $scope.feed = FeedService;

  $scope.feed.loadFeed()
    .then(function (posts) {
      $ionicLoading.hide();
    });


  $scope.doRefresh = function () {
		$scope.feed.loadFeed().then(function () {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

/*  var sleepFor = function ( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /!* do nothing *!/ }

  }*/

});



app.controller('PostCtrl', function ($scope, $stateParams, $window, $cordovaSocialSharing, FeedService) {
	console.log("Loading PostCtrl");

  $scope.postId = $stateParams.id;
  $scope.post = FeedService.getEntry($scope.postId);

	$scope.share = function () {
		console.debug("Sharing post");
    $cordovaSocialSharing.share($scope.post.contentSnippet, $scope.post.title, $scope.post.thumbnail, $scope.post.link);
	};

	$scope.readMore = function () {
		console.debug("Read more post");
    $window.open($scope.post.link, "_system", "location=yes");
	};

});
