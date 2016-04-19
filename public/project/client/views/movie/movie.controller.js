(function(){
    angular
        .module("NowWatching")
        .controller("MovieController", MovieController);

    function MovieController($rootScope, $routeParams, UserService, MovieService) {
        var vm = this;

        vm.imdbID = $routeParams.id;

        function init(){
            MovieService
                .findMovieByImdbID(vm.imdbID)
                .then(
                function(response) {
                    vm.movie = response.data;
                }
            );

            vm.moviePoster = MovieService.findMoviePoster(vm.imdbID);
        }

        init();
        if($rootScope.currentUser) {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    if (response.data) {
                        if (response.data.watchlist.indexOf(vm.imdbID) == -1) {
                            vm.showWatchlist = true;
                        }
                        else{
                            vm.showRemoveWatchlist = true;
                        }
                    }
                });
        }

        vm.addToWatchlist = addToWatchlist;
        vm.removeFromWatchlist = removeFromWatchlist;

        function removeFromWatchlist(){
            UserService
                .removeMovieFromWatchlist($rootScope.currentUser._id, vm.imdbID)
                .then(function(response){
                    vm.message = vm.movie.Title +" removed from your watchlist";
                    vm.showRemoveWatchlist = false;
                    vm.showWatchlist = true;
                });
        }

        function addToWatchlist(){
            UserService
                .getCurrentUser()
                .then(
                    function(response){
                        UserService
                            .addMovieToWatchlist(response.data._id, vm.imdbID)
                            .then(
                                function(res){
                                    vm.showWatchlist = false;
                                    vm.message = vm.movie.Title +" added to your watchlist";
                                    vm.showRemoveWatchlist = true;
                                }
                            )
                    });
        }

    }
})();