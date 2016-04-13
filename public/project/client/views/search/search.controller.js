(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("SearchController", SearchController);

    function SearchController($location) {
        var vm = this;

        vm.searchResults = searchResults;
        vm.itemDetails = itemDetails;

        function searchResults(search, type){
            switch(type) {
                case "Users":
                    $location.url("/profile/" + search._id);
                    break;
                case "Posts":
                    $location.url("/post/" + search._id);
                    break;
                case "Movies":
                    $location.url("/movie/" + search.imdbID);
                    break;
            }
        }
    }
})();