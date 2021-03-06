(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("PostsController", PostsController);

    function PostsController($scope, $location, $rootScope, UserService, PostService, MovieService) {
        var vm = this;

        var users = $rootScope.currentUser.following;
        users.push($rootScope.currentUser._id);

        function init() {
            vm.posts = [];
            for ( var id in users){
                PostService
                    .findAllPostsForUser(users[id])
                    .then(
                        function(response){
                            for (var r in response.data) {
                                updateNamesForPosts(response.data[r]);
                                updatePostersForPosts(response.data[r]);
                            }
                            vm.posts = vm.posts.reverse();
                        }
                    );
            }

            /*PostService.findAllPosts()
                .then(
                    function (response) {
                        for (var r in response.data) {
                            updateNamesForPosts(response.data[r]);
                            updatePostersForPosts(response.data[r]);
                        }
                        vm.posts = vm.posts.reverse();
                    });*/
        }

        function updatePostersForPosts(post){
            post.movie.Poster = MovieService.findMoviePoster(post.movie.imdbID);
        }



        function updateNamesForPosts(post){
            UserService
                .findUserByID(post.userID)
                .then(
                    function (u) {
                        if(!u.data.firstName && !u.data.lastName){
                            post.user = u.data.username;
                        }
                        else if(!u.data.firstName && u.data.lastName){
                            post.user = u.data.lastName;
                        }
                        else if(u.data.firstName && !u.data.lastName){
                            post.user = u.data.firstName;
                        }
                        else {
                            post.user = u.data.firstName + " " + u.data.lastName;
                        }
                    });
            vm.posts.push(post);
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

        function addPost(movie,description){
            var newPost = {
                userID: $rootScope.currentUser._id,
                movie: movie,
                description: description
            };
            PostService
                .addPost(newPost, $rootScope.currentUser._id)
                .then(
                    function(response){
                        vm.description = "";
                        $scope.$broadcast('angucomplete-alt:clearInput');
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