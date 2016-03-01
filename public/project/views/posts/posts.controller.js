(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("PostsController", PostsController);

    function PostsController($scope, PostService) {
        PostService.findAllPosts( function(response){
            $scope.posts = response;
        });
    }
})();