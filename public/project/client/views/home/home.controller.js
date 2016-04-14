(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("HomeController", HomeController);

    function HomeController($location, UserService, PostService) {
        var vm = this;

        vm.posts = [];

        function init() {
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
                        if(!u.data.firstName && !u.data.lastName){
                            post.user = u.data.username;
                        }
                        else {
                            post.user = u.data.firstName + " " + u.data.lastName;
                        }
                    });
            vm.posts.push(post);
            vm.posts = vm.posts.reverse();
        }

        init();

        vm.postDetails = postDetails;

        function postDetails(post){
            $location.url("/post/" + post._id);
        }
    }
})();