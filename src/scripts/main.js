bespoke.horizontal.from('article', {
  bullets: 'li, .bullet',
  scale: true,
  hash: true,
  progress: true,
  state: true
});

angular.module('myApp', ['ngRoute'])
.config(function($routeProvider) {
  $routeProvider.when('/first', { 
    template: '<h1>First route</h1>', 
    controller: 'FirstCtrl' 
  }).when('/second', {
    template: '<h1>Second route</h1>', 
    controller: 'SecondCtrl'
  });
})
.factory('MyService', function() {
  var service = {
    sayHello: function() {
      return "Hello";
    }
  }
  return service;
})
.controller('DemoCtrl', function($scope, $http) {
  $scope.name = "Ari";
  $scope.sayHello = function() {
    alert("Hello " + $scope.name);
  }

  $scope.people = [
    {name: "Ari", email: "ari@fullstack.io" },
    {name: "Nate", email: "nate@fullstack.io" }
  ];

  $scope.city = "San Francisco, CA";
  $scope.getWeather = function() {
    var url = "http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&units=imperial&cnt=7&callback=JSON_CALLBACK&q="
    $http({
      method: 'JSONP',
      url: url + $scope.city
    }).success(function(data, status) {
      console.log("DATA", data);
      $scope.weather = data.list[0];
    });
  }
})
.controller('ParentCtrl', function($scope) {
  $scope.name = "Q";
  $scope.geo = "San Francisco";
})
.controller('ChildCtrl', function($scope) {
  $scope.name = "Ari";
})
.controller('FirstCtrl', function($scope) {
})
.controller('SecondCtrl', function($scope) {
})
.controller('ServicesCtrl', function($scope, MyService) {
  $scope.greeting = MyService.sayHello();
});