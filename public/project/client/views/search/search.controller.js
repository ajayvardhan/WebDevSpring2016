(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("SearchController", SearchController);

    function SearchController($scope, $location, MovieService, UserService, PostService) {
        $scope.searchResults = searchResults;
        $scope.itemDetails = itemDetails;


        function searchResults(search){
            var key = search.keyword.toLowerCase();
            $scope.results = [];
            switch(search.type){
                case "Users":
                    $scope.firstColumn = "Username";
                    $scope.secondColumn = "Name";
                    UserService.findUser(key)
                        .then(function(response){
                            for (var r in response.data){
                                var newResult = {
                                    _id: response.data[r]._id,
                                    firstItem: response.data[r].firstName,
                                    secondItem: response.data[r].lastName
                                };
                                $scope.results.push(newResult);
                            }
                        });
                    break;
                case "Posts":
                    $scope.firstColumn = "Movie";
                    $scope.secondColumn = "Description";
                    PostService
                        .findPosts(key)
                        .then(function(response){
                            for (var r in response.data){
                                var newResult = {
                                    _id: response.data[r]._id,
                                    firstItem: response.data[r].title,
                                    secondItem: response.data[r].description
                                };
                                $scope.results.push(newResult);
                            }
                        });
                    break;
                case "Movies":
                    $scope.firstColumn = "Title";
                    $scope.secondColumn = "Year";
                    MovieService
                        .findMovieBySearch(key)
                        .then(function(response){
                            for (var r in response.data.Search){
                                var newResult = {
                                    _id: response.data.Search[r].imdbID,
                                    firstItem: response.data.Search[r].Title,
                                    secondItem: response.data.Search[r].Year,
                                    poster: response.data.Search[r].Poster
                                };
                                $scope.results.push(newResult);
                            }
                        });
                    break;
            }
        }

        function itemDetails(search, item) {
            switch(search.type) {
                case "Users":
                    $location.url("/profile/" + item._id);
                    break;
                case "Posts":
                    $location.url("/post/" + item._id);
                    break;
                case "Movies":
                    $location.url("/movie/" + item._id);
                    break;
            }
        }
    }
})();