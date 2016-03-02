(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("HomeController", HomeController);

    function HomeController($scope, $rootScope, $location, PostService) {
        PostService.findAllPosts( function(response){
            $scope.posts = response;
        });
        $scope.searchResults = searchResults;

        function searchResults(search){
            $rootScope.search = search;
            $location.url("/search");
        }
    }
})();