(function(){
    angular
        .module("NowWatching")
        .controller("MovieController", MovieController);

    function MovieController($scope, $location, $routeParams, UserService, MovieService) {
        $scope.imdbID = $routeParams.id;

        function init(){
            MovieService
                .findMovieByImdbID($scope.imdbID)
                .then(
                function(response) {
                    $scope.movie = response.data;
                }
            );
        }

        init();
        UserService
            .getCurrentUser()
            .then(function(response){
                if(response.data) {
                    if (response.data.watchlist.indexOf($scope.imdbID) == -1){
                        $scope.showWatchlist = true;
                    }
                }
            });

/*        if ($rootScope.currentUser && $rootScope.currentUser.watchlist.indexOf($scope.imdbID) == -1){
            $scope.showWatchlist = true;
        }*/

        $scope.addToWatchlist = addToWatchlist;
        $scope.goToWatchlist = goToWatchlist;

        function addToWatchlist(){
            UserService
                .getCurrentUser()
                .then(
                    function(response){
                        UserService
                            .addMovieToWatchlist(response.data._id, $scope.imdbID)
                            .then(
                                function(res){
                                    $scope.showWatchlist = false;
                                    $scope.message = $scope.movie.Title;
                                }
                            )
                    });
            /*$rootScope.currentUser.watchlist.push($scope.imdbID);
            $scope.showWatchlist = false;
            $scope.message = $scope.movie.Title;*/
        }

        function goToWatchlist(){
            $location.url("/watchlist");
        }

    }
})();