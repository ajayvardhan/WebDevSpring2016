(function(){
    angular
        .module("NowWatching")
        .factory("MovieService", movieService);

    function movieService($http) {

        return {
            findMovieBySearch: findMovieBySearch,
            findMovieByImdbID: findMovieByImdbID,
            findMovieByTitle: findMovieByTitle
        };

        function findMovieBySearch(title) {
            return $http.get("http://www.omdbapi.com/?s="+title);
        }

        function findMovieByImdbID(imdbID) {
            return $http.get("http://www.omdbapi.com/?i="+imdbID);
        }

        function findMovieByTitle(title){
            return $http.get("http://www.omdbapi.com/?t="+title);
        }

    }
})();