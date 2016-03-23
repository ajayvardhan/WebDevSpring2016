(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("PostController", PostController);

    function PostController($scope, $routeParams, $location, MovieService, UserService, PostService) {
        $scope.movieDetails = movieDetails;
        $scope.userDetails = userDetails;
        $scope.addComment = addComment;


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
                    $scope.movie = response.data;
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
                            $scope.message = "Movie not found";
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
                        $scope.comment="";
                        $scope.movie.comments.reverse();
                        $scope.movie.comments.push(comment);
                        $scope.movie.comments.reverse();
                    })
        }
    }
})();