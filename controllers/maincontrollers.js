'use strict';

var tempModule = angular.module('mainControllers', []);

tempModule.controller('main', function ($scope) {
    $scope.appTitle = "TemplateApp";
});


//Fetch .json lists to retrieve Data for URLs & UL lists
tempModule.controller('navigation', function ($scope, $http) {
    $http.get("views/navigation/navigationList.json").success(function (navData) {
        $scope.navList = navData.Navigation;
    });
});

//Fetch .json Template info; file will have to be identical to id of both the routeParam and LinkId
tempModule.controller('games', ['$scope', '$routeParams', '$http',
    function ($scope, $routeParams, $http) {
        $http.get('/views/games/' + $routeParams.gameId + '.json').
            success(function (gdata) {
                $scope.gamesData = gdata.Game;
            }).
            error(function(edata){
                $http.get("/views/games/games.json").success(function (gdataFallback) {
                    $scope.gamesData = gdataFallback.GamesList;
                });
            });
    }]);



