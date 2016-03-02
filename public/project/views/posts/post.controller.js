(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("PostController", PostController);

    function PostController($scope, $routeParams, $location, MovieService, UserService, PostService) {
        PostService.findPostByID($routeParams.id, function(response){
            for (var r in response) {
                UserService.findUserByID(response[r].userID, function (u) {
                    response[r].user = u.firstName + " " + u.lastName;
                })
            }
            $scope.movie = response;
        });

        $scope.movieDetails = movieDetails;
        $scope.addComment = addComment;

        function movieDetails(movie){
            MovieService.findMovieByTitle(movie.title, function(response){
                if (response.imdbID) {
                    $location.url("/movie/" + response.imdbID);
                }
                else {
                    $scope.message = "Movie not found";
                }
            })
        }

        function addComment(comment){
            PostService.addComment($routeParams.id, comment, function(response){
                $scope.comment="";
            })
        }
    }
})();