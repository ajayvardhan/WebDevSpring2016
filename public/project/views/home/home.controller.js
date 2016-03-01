(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("HomeController", HomeController);

    function HomeController($scope, PostService) {
        PostService.findAllPosts( function(response){
            $scope.posts = response;
        });
    }
})();