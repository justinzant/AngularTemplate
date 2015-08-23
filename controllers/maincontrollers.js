'use strict';

var tempModule = angular.module('mainControllers', []);

tempModule.controller('main', ['$scope', '$routeParams', '$http',
    function ($scope, $routeParams, $http) {
        $scope.appTitle = "TemplateApp";

        if (!$routeParams.homeId) {
            $http.get('/views/home/home.json').success(function (pdata) {
                $scope.homeData = pdata.Partial;
            })
        } else {
            $http.get('/views/home/' + $routeParams.homeId + '.json').
                success(function (pdata) {
                    $scope.homeData = pdata.Partial;
                }).
                error(function (edata) {
                    $http.get("/views/home/home.json").success(function (dataFallback) {
                        $scope.homeData = dataFallback.Partial;
                    });
                });
        }
        
}]);

//Fetch .json lists to retrieve Data for URLs & UL lists
tempModule.controller('navigation', function ($scope, $http) {
    $http.get("views/navigation/navigationList.json").success(function (navData) {
        $scope.navList = navData.Navigation;
    });
});

//Fetch .json Template info; file will have to be identical to id of both the routeParam and LinkId
//First fetch directs to the info that fils HTML template
//Second fetch gets the entire listof partials
tempModule.controller('partials', ['$scope', '$routeParams', '$http',
    function ($scope, $routeParams, $http) {
        $scope.partialsData = [];
        $scope.route = $routeParams.partialId;
        if (!$routeParams.partialId) {
            $http.get('/views/home/home.json').success(function (pdata) {
                $scope.partialsData = pdata.Partial;
                $scope.route = 'home';
            })
        } else{
        $http.get('/views/partials/' + $routeParams.partialId + '.json').
            success(function (pdata) {
                $scope.partialsData = pdata.Partial;
            }).
            error(function(edata){
                $http.get("/views/partials/partials.json").success(function (dataFallback) {
                    $scope.partialsData = dataFallback.PartialsList;
                });
            });
        }
        
    }]);



