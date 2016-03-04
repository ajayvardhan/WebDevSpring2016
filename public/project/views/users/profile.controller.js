(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $routeParams, $rootScope, UserService, PostService) {
        UserService.findUserByID($routeParams.id, function(response) {
            $scope.user = response;
        });

        PostService.findAllPostsForUser($routeParams.id, function(response){
            $scope.posts = response;
        });
        console.log($rootScope.currentUser.following);
        console.log($routeParams.id);
        console.log($rootScope.currentUser.following.indexOf(234));
        var a = true;
        for (var f in $rootScope.currentUser.following){
            if ($rootScope.currentUser.following[f] == $routeParams.id){
                a = false;
            }
        }
        if ($rootScope.currentUser &&
            $rootScope.currentUser._id != $routeParams.id && a)
            {
            $scope.showFollow = true;
        }

        $scope.followUser = followUser;

        function followUser(user){
            $rootScope.currentUser.following.push(user._id);
            $scope.showFollow = false;
            $scope.message = "You have now followed " + user.firstName + " " + user.lastName;
        }
    }
})();