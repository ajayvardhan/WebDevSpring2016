(function() {
    angular
        .module("NowWatching")
        .controller("WatchlistController", WatchlistController);

    function WatchlistController($scope, $rootScope, $location, UserService, MovieService) {
        UserService.findUserByID($rootScope.currentUser._id, function(response){
            $scope.movies = response.watchlist;
        });

        $scope.movieDetails = movieDetails;

        function movieDetails(movie){
            MovieService.findMovieByTitle(movie, function(response){
                if (response.imdbID) {
                    $location.url("/movie/" + response.imdbID);
                }
                else {
                    $scope.message = "Movie not found";
                }
            })
        }
    }
})();