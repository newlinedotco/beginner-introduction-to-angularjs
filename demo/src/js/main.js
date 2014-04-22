angular.module('myApp', [])
.controller('MainController', function($scope, $http, $timeout) {
  $scope.cats = [];
  $scope.favorites = [];

  $scope.addToFavorites = function(joke) {
    $scope.favorites.unshift(joke);
  }

  $scope.getCat = function() {
    $http({
      method: 'JSONP',
      url: 'http://thecatapi.com/api/images/get?type=gif',
      params: {
        callback: 'JSON_CALLBACK'
      }
    }).then(function(data) {
      var cat = data.data;
      console.log(cat);
      if ($scope.cat.length > 10) {
        $scope.cats.splice(10, 1);
      }
    });
  }

  var nextCat = function() {
    $scope.getCat();
    $timeout(function() {
      nextCat();
    }, 3000);
  }

  nextCat();
});