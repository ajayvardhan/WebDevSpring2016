(function(){
    angular
        .module("NowWatching")
        .controller("MovieController", MovieController);

    function MovieController($scope, $rootScope, $location, $routeParams, MovieService) {
        $scope.imdbID = $routeParams.id;

        function init(){
            MovieService.findMovieByImdbID(
                $scope.imdbID,
                function(response) {
                    $scope.movie = response;
                }
            );
        }

        init();
        if ($rootScope.currentUser && $rootScope.currentUser.watchlist.indexOf($scope.imdbID) == -1){
            $scope.showWatchlist = true;
        }

        $scope.addToWatchlist = addToWatchlist;
        $scope.goToWatchlist = goToWatchlist;

        function addToWatchlist(){
            $rootScope.currentUser.watchlist.push($scope.imdbID);
            $scope.showWatchlist = false;
            $scope.message = $scope.movie.Title;
        }

        function goToWatchlist(){
            $location.url("/watchlist");
        }

    }
})();