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
         when('/:homeId', {
            templateUrl: 'views/home/home.html',
            controller: 'main'
         })
          .when('/views/partials/:partialId', {
            templateUrl: 'views/partials/partials.html',
            controller: 'partials'
        }).otherwise({
            redirectTo: '/',
            templateUrl: 'views/home/home.html',
            controller: 'main'
        });

}]);
