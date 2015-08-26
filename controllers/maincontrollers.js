'use strict';

var tempModule = angular.module('mainControllers', []);

tempModule.controller('main', ['$scope', '$routeParams', '$http',
    function ($scope, $routeParams, $http) {
        $scope.appTitle = "Justin Zant";

        if (!$routeParams.homeId) {
            $http.get('views/home/home.json').success(function (pdata) {
                $scope.homeData = pdata.Partial;
            })
        } else {
            $http.get('views/home/' + $routeParams.homeId + '.json').
                success(function (pdata) {
                    $scope.homeData = pdata.Partial;
                }).
                error(function (edata) {
                    $http.get("views/home/home.json").success(function (dataFallback) {
                        $scope.homeData = dataFallback.Partial;
                    });
                });
        }
        
}]);

//Fetch .json lists to retrieve Data for URLs & UL lists
tempModule.controller('navigation', function ($scope, $http, $routeParams) {
    $http.get("views/navigation/navigationList.json").success(function (navData) {
        $scope.navList = navData.Navigation;
        $scope.pageIndex = 1;
        $scope.pageUrl = "/views/home/home";
        
        $scope.$on('PageNext', function () {
            PageLoader(1);
        });
        $scope.$on('PagePrevious', function () {
            PageLoader(-1);
        });

        //Check current Id and search through index
        //0 = current
         function PageLoader(requestIndex) {
            var urlPrefix = "/views/partials/";
            var currentUrl = $routeParams.partialId;

            if (!$routeParams.partialId) {
                currentUrl = "home";
            }

            var nList = $scope.navList;
            var pId = 0;
            for (var i = 0; i < nList.length; i++) {
                if (nList[i].Id == currentUrl) {
                    $scope.pageIndex = i;
                    pId = i + requestIndex;

                    if (pId > nList.length - 1) {
                        pId = nList.length - 1;
                    } else if (pId < 1) {
                        pId = 0;
                    }
                    break;
                }
            }
            
             //Change route based on routeParam & Id
            if (pId > 0) {
                $scope.pageUrl = urlPrefix + nList[pId].Id;
            } else {
                $scope.pageUrl = "/views/home/home";
            }
        };       
       
    });
});

//Fetch .json Template info; file will have to be identical to id of both the routeParam and LinkId
//First fetch directs to the info that fils HTML template
//Second fetch gets the entire listof partials
tempModule.controller('partials', ['$scope', '$routeParams', '$http',
    function ($scope, $routeParams, $http) {
        $scope.partialsData = [];
        $scope.route = $routeParams.partialId;

        var jDataObj = {
            method: "GET",
            url: 'views/home/home.json',
            cache: false
        };

        if (!$routeParams.partialId) {
            $http(jDataObj).success(function (pdata) {
                $scope.partialsData = pdata.Partial;
                $scope.route = 'home';
            })
        } else {
            jDataObj.url = '/views/partials/' + $routeParams.partialId + '.json'
            $http( jDataObj ).
                then(function (pdata) {
                    $scope.partialsData = pdata.data.Partial;
                }, function (response) {
                    jDataObj.url = "views/partials/partials.json";
                    $http(jDataObj).
                        then(function (dataFallback) {
                            $scope.partialsData = dataFallback.data.PartialsList;
                        });
                })
        };

        }]);
