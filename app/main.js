'use strict';

/* App Module */

var tempApp = angular.module('templateApp', [
    'ngRoute',
    'mainControllers',
]);

/* Look at URL and fetch the phoneID */
/* Provide route based on URL & controller */
tempApp.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
      $routeProvider.
         when('/', {
            templateUrl: 'views/home/home.html',
            controller: 'main'
         })
          .when('/views/games/:gameId', {
            templateUrl: 'views/games/games.html',
            controller: 'games'
        }).otherwise({
            redirectTo: '/'
        });

}]);
