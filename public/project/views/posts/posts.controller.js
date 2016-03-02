(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("PostsController", PostsController);

    function PostsController($scope, $location, $rootScope, MovieService, UserService, PostService) {


        function fillPosts() {
            PostService.findAllPosts(function (response) {
                for (var r in response) {
                    UserService.findUserByID(response[r].userID, function (u) {
                        response[r].user = u.firstName + " " + u.lastName;
                    })
                }
                $scope.posts = response;
            });
        }

        fillPosts();

        $scope.itemDetails = itemDetails;
        $scope.userDetails = userDetails;
        $scope.addPost = addPost;

        function itemDetails(post){
            MovieService.findMovieByTitle(post.title, function(response){
                if (response.imdbID) {
                    $location.url("/movie/" + response.imdbID);
                }
                else {
                    $scope.message = "Movie not found";
                }
            })
        }

        function userDetails(post){
            $location.url("/profile/" + post.userID);
        }

        function addPost(movie){
            PostService.addPost(movie, $rootScope.currentUser._id, function(){
                $scope.movie = "";
                fillPosts();
            })
        }
    }
})();