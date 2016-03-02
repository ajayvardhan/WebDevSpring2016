(function(){
    angular
        .module("NowWatching")
        .controller("MovieController", MovieController);

    function MovieController($scope, $routeParams, MovieService) {
        $scope.imdbID = $routeParams.id;

        MovieService.findMovieByImdbID(
            $scope.imdbID,
            function(response) {
                $scope.movie = response;
            }
        )
    }
})();