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

        function findMovieBySearch(title, callback) {
            $http.get("http://www.omdbapi.com/?s="+title)
                .success(callback);
        }

        function findMovieByImdbID(imdbID, callback) {
            $http.get("http://www.omdbapi.com/?i="+imdbID)
                .success(callback);
        }

        function findMovieByTitle(title, callback){
            $http.get("http://www.omdbapi.com/?t="+title)
                .success(callback);
        }

    }
})();