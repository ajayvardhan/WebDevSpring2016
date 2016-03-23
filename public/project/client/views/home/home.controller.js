(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("HomeController", HomeController);

    function HomeController($scope, $location, UserService, PostService) {
        $scope.posts = [];


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
            $scope.posts.push(post);
            $scope.posts = $scope.posts.reverse();
        }

        init();

        $scope.postDetails = postDetails;

        function postDetails(post){
            $location.url("/post/" + post._id);
        }
    }
})();