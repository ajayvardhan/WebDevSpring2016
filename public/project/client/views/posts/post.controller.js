(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("PostController", PostController);

    function PostController($routeParams, $rootScope, $location, UserService, PostService, MovieService) {
        var vm = this;

        vm.movieDetails = movieDetails;
        vm.userDetails = userDetails;
        vm.addComment = addComment;
        vm.deletePost = deletePost;


        PostService
            .findPostByID($routeParams.id)
            .then(
                function(response){
                    if($rootScope.currentUser && response.data.userID == $rootScope.currentUser._id){
                        vm.showDeletePost = true;
                    }
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
                    vm.movie.movie.Poster = MovieService.findMoviePoster(vm.movie.movie.imdbID);
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

        function deletePost(){
            PostService
                .deletePost(vm.movie._id)
                .then(
                    function(response){
                        $location.url("/posts");
                    }
                )
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