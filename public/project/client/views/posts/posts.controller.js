(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("PostsController", PostsController);

    function PostsController($timeout, $location, $rootScope, UserService, PostService) {
        var vm = this;

        /*(function update() {
            $timeout(update, 10000);
            init();
        }());*/



        function init() {
/*
            UserService
                .getCurrentUser()
                .then(function(response){
                    if(response.data) {
                        //setUserIDForPost(response.data._id);
                    }
                });*/

            vm.posts = [];
            PostService.findAllPosts()
                .then(
                    function (response) {
                        for (var r in response.data) {
                            updateNamesForPosts(response.data[r]);
                        }
                    });
        }



        function updateNamesForPosts(post){
            UserService
                .findUserByID(post.userID)
                .then(
                    function (u) {
                        if (!u.data.firstName){
                            u.data.firstName = "";
                        }
                        if (!u.data.lastName){
                            u.data.lastName = ""
                        }
                        post.user = u.data.firstName + " " + u.data.lastName;
                    });
            vm.posts.push(post);
            vm.posts = vm.posts.reverse();
        }

        init();



        vm.postDetails = postDetails;
        vm.userDetails = userDetails;
        vm.addPost = addPost;
        vm.deletePost = deletePost;
        vm.selectPost = selectPost;
        vm.updatePost = updatePost;

        function postDetails(post){
            $location.url("/post/" + post._id);
        }

        function userDetails(post){
            $location.url("/profile/" + post.userID);
        }

        function addPost(movie){
            movie.userID = $rootScope.currentUser._id;
            PostService
                .addPost(movie, movie.userID)
                .then(
                    function(response){
                        vm.movie = "";
                        init();
                    });
        }

        function deletePost(post){
            PostService
                .deletePost(post._id)
                .then(function(response){
                });
        }

        function selectPost(post){
            vm.newPost = {
                _id : post._id,
                title : post.title,
                description: post.description,
                comments: post.comments
            };
        }

        function updatePost(post){
            PostService.updatePost(post)
                .then(
                    function(response){
                        vm.newPost = "";
                    });
        }
    }
})();