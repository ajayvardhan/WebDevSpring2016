(function(){
    angular
        .module("NowWatching")
        .controller("MovieController", MovieController);

    function MovieController($location, $routeParams, UserService, MovieService) {
        var vm = this;

        vm.imdbID = $routeParams.id;

        function init(){
            MovieService
                .findMovieByImdbID(vm.imdbID)
                .then(
                function(response) {
                    vm.movie = response.data;
                    vm.moviePoster = vm.movie.Poster;
                }
            );

            vm.moviePoster = MovieService.findMoviePoster(vm.imdbID);
        }

        init();
        UserService
            .getCurrentUser()
            .then(function(response){
                if(response.data) {
                    if (response.data.watchlist.indexOf(vm.imdbID) == -1){
                        vm.showWatchlist = true;
                    }
                }
            });

        vm.addToWatchlist = addToWatchlist;

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
                                    vm.message = vm.movie.Title;
                                }
                            )
                    });
        }

    }
})();