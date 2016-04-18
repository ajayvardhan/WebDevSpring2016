(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("SearchController", SearchController);

    function SearchController($location, $routeParams) {
        var vm = this;

        var searchType = $routeParams.type;
        var searchID = $routeParams.id;

        function init(){
            switch(searchType){
                case "user":
                    break;
                case "posts":
                    break;
                case "movies":
                    break;
            }
        }

        init();

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