(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("HomeController", HomeController);

    function HomeController($location, UserService, PostService, MovieService) {
        var vm = this;

        vm.posts = [];


        function init() {
            PostService.findAllPosts()
                .then(
                    function (response) {
                        for (var r in response.data) {
                            updateNamesForPosts(response.data[r]);
                            updatePostersForPosts(response.data[r]);
                        }
                        vm.posts = vm.posts.reverse();
                    });
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

        function postDetails(post){
            $location.url("/post/" + post._id);
        }
    }
})();