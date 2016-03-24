(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("HomeController", HomeController);

    function HomeController($location, UserService, PostService) {
        var vm = this;

        vm.posts = [];

        /*vm.myInterval = 1000;
        vm.noWrapSlides = false;
        vm.active = 0;
        var slides = vm.slides = [
            {
                image: '/the/path/to/the/image0.jgp',
                text: 'Test 0',
                id: 0
            },
            {
                image: '/the/path/to/the/image1.jgp',
                text: 'Test 1',
                id: 1
            },
            {
                image: '/the/path/to/the/image2.jgp',
                text: 'Test 2',
                id: 2
            },
            {
                image: '/the/path/to/the/image3.jgp',
                text: 'Test 3',
                id: 3
            },
            {
                image: '/the/path/to/the/image4.jgp',
                text: 'Test 4',
                id: 4
            }
        ];*/


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
                        post.user = u.data.firstName + " " + u.data.lastName;
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