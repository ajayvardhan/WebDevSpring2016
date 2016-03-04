(function() {
    angular
        .module("NowWatching")
        .controller("WatchlistController", WatchlistController);

    function WatchlistController($scope, $rootScope, $location, MovieService) {
        $scope.movies = $rootScope.currentUser.watchlist;

        $scope.movieDetails = movieDetails;
        $scope.removeMovie = removeMovie;

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

        function removeMovie(movie){
            $rootScope.currentUser.watchlist.splice($rootScope.currentUser.watchlist.indexOf(movie),1);
        }
    }
})();