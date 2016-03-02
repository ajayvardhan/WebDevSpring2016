(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("PostsController", PostsController);

    function PostsController($scope, $location, $rootScope, UserService, PostService) {


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
        $scope.deletePost = deletePost;
        $scope.selectPost = selectPost;
        $scope.updatePost = updatePost;

        function itemDetails(post){
            $location.url("/post/" + post._id);
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

        function deletePost(post){
            PostService.deletePost(post._id,function(){

            })
        }

        function selectPost(post){
            $scope.newPost = {
                _id : post._id,
                title : post.title,
                description: post.description,
                comments: post.comments
            };
        }

        function updatePost(post){
            PostService.updatePost(post, function(){
                $scope.newPost = "";
            })
        }
    }
})();