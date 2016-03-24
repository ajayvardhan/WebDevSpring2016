(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("SearchController", SearchController);

    function SearchController($location, MovieService, UserService, PostService) {
        var vm = this;

        vm.searchResults = searchResults;
        vm.itemDetails = itemDetails;


        function searchResults(search){
            var key = search.keyword.toLowerCase();
            vm.results = [];
            switch(search.type){
                case "Users":
                    vm.firstColumn = "Username";
                    vm.secondColumn = "Name";
                    UserService.findUser(key)
                        .then(function(response){
                            for (var r in response.data){
                                var newResult = {
                                    _id: response.data[r]._id,
                                    firstItem: response.data[r].firstName,
                                    secondItem: response.data[r].lastName
                                };
                                vm.results.push(newResult);
                            }
                        });
                    break;
                case "Posts":
                    vm.firstColumn = "Movie";
                    vm.secondColumn = "Description";
                    PostService
                        .findPosts(key)
                        .then(function(response){
                            for (var r in response.data){
                                var newResult = {
                                    _id: response.data[r]._id,
                                    firstItem: response.data[r].title,
                                    secondItem: response.data[r].description
                                };
                                vm.results.push(newResult);
                            }
                        });
                    break;
                case "Movies":
                    vm.firstColumn = "Title";
                    vm.secondColumn = "Year";
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
                                vm.results.push(newResult);
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