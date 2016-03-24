(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("PostController", PostController);

    function PostController($routeParams, $location, MovieService, UserService, PostService) {
        var vm = this;

        vm.movieDetails = movieDetails;
        vm.userDetails = userDetails;
        vm.addComment = addComment;


        PostService
            .findPostByID($routeParams.id)
            .then(
                function(response){
                    UserService
                        .findUserByID(response.data.userID)
                        .then(
                            function (u) {
                                if (!u.data.firstName){
                                    u.data.firstName = "";
                                }
                                if (!u.data.lastName){
                                    u.data.lastName = "";
                                }
                                response.data.user = u.data.firstName + " " + u.data.lastName;
                                response.data.userID = u.data._id;
                            });
                    response.data.comments = response.data.comments.reverse();
                    vm.movie = response.data;
                });

        function movieDetails(movie){
            MovieService
                .findMovieByTitle(movie.title)
                .then(
                    function(response){
                        if (response.data.imdbID) {
                            $location.url("/movie/" + response.data.imdbID);
                        }
                        else {
                            vm.message = "Movie not found";
                        }
                    });
        }
        function userDetails(movie){
            $location.url("/profile/" + movie.userID);
        }

        function addComment(comment){
            var newComment = {comment: comment};
            PostService
                .addComment($routeParams.id, newComment)
                .then(
                    function(response){
                        vm.comment="";
                        vm.movie.comments.reverse();
                        vm.movie.comments.push(comment);
                        vm.movie.comments.reverse();
                    })
        }
    }
})();