(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("SearchController", SearchController);

    function SearchController($scope, $location, MovieService, UserService, PostService) {
        $scope.firstColumn = "";
        $scope.secondColumn = "";
        $scope.results = [];
        $scope.searchResults = searchResults;
        $scope.itemDetails = itemDetails;


        function searchResults(search){
            var key = search.keyword.toLowerCase();
            $scope.results = [];
            switch(search.type){
                case "Users":
                    $scope.firstColumn = "First Name";
                    $scope.secondColumn = "Last Name";
                    UserService.findUser(key, function(response){
                        for (var r in response){
                            var newResult = {
                                id: response[r]._id,
                                firstItem: response[r].firstName,
                                secondItem: response[r].lastName
                            };
                            $scope.results.push(newResult);
                        }
                    });
                    break;
                case "Posts":
                    $scope.firstColumn = "Movie";
                    $scope.secondColumn = "Description";
                    PostService.findPosts(key, function(response){
                        for (var r in response){
                            var newResult = {
                                id: response[r]._id,
                                firstItem: response[r].title,
                                secondItem: response[r].description
                            };
                            $scope.results.push(newResult);
                        }
                    });
                    break;
                case "Movies":
                    $scope.firstColumn = "Title";
                    $scope.secondColumn = "Year";
                    MovieService.findMovieBySearch(
                        key,
                        function(response){
                            for (var r in response.Search){
                                var newResult = {
                                    id: response.Search[r].imdbID,
                                    firstItem: response.Search[r].Title,
                                    secondItem: response.Search[r].Year
                                };
                                $scope.results.push(newResult);
                            }
                        });
                    break;
            }
        }

        function itemDetails(search, item) {
            switch (search.type) {
                case "Users":
                    $location.url("/profile/" + item.id);
                    break;
                default:
                    $location.url("/movie/" + item.id);
            }
        }
    }
})();