(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $routeParams, UserService, PostService) {
        UserService.findUserByID($routeParams.id, function(response) {
            $scope.user = response;
        });

        PostService.findAllPostsForUser($routeParams.id, function(response){
            $scope.posts = response;
        });
    }
})();