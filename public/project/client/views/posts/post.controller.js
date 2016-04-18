(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("PostController", PostController);

    function PostController($routeParams, $location, UserService, PostService, MovieService) {
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
                                if(!u.data.firstName && !u.data.lastName){
                                    response.data.user = u.data.username;
                                }
                                else {
                                    response.data.user = u.data.firstName + " " + u.data.lastName;
                                }
                                response.data.userID = u.data._id;
                            });
                    // response.data.comments = response.data.comments.reverse();
                    vm.movie = response.data;
                    vm.movie.movie.Poster = MovieService.findMoviePoster(post.movie.imdbID);
                    if(vm.movie.comments == []){
                        vm.showNoComments = true;
                    }
                });


        function movieDetails(movie){
            $location.url("/movie/" + movie.movie.imdbID);
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
                        vm.showNoComments = false;
                        vm.comment="";
                        vm.movie.comments.reverse();
                        vm.movie.comments.push(comment);
                        vm.movie.comments.reverse();
                    })
        }
    }
})();