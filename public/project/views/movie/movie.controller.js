(function(){
    angular
        .module("NowWatching")
        .controller("MovieController", MovieController);

    function MovieController($scope, $rootScope, $location, $routeParams, UserService, MovieService) {
        $scope.imdbID = $routeParams.id;

        MovieService.findMovieByImdbID(
            $scope.imdbID,
            function(response) {
                $scope.movie = response;
            }
        );

        $scope.addToWatchlist = addToWatchlist;
        $scope.goToWatchlist = goToWatchlist;

        function addToWatchlist(movie){
            UserService.addToWatchlist($rootScope.currentUser._id, movie.Title, function(){
                $scope.message = $scope.movie.Title;
            });
        }

        function goToWatchlist(){
            $location.url("/watchlist");
        }

    }
})();