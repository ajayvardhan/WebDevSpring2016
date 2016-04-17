(function(){
    angular
        .module("NowWatching")
        .factory("MovieService", movieService);

    function movieService($http) {

        return {
            findMovieBySearch: findMovieBySearch,
            findMovieByImdbID: findMovieByImdbID,
            findMovieByTitle: findMovieByTitle,
            findMoviePoster: findMoviePoster
        };

        function findMovieBySearch(title) {
            return $http.get("http://www.omdbapi.com/?s="+title+"&apikey=fdb29024");
        }

        function findMovieByImdbID(imdbID) {
            return $http.get("http://www.omdbapi.com/?i="+imdbID+"&apikey=fdb29024");
        }

        function findMovieByTitle(title){
            return $http.get("http://www.omdbapi.com/?t="+title+"&apikey=fdb29024");
        }

        function findMoviePoster(imdbID){
            return "http://img.omdbapi.com/?i="+imdbID+"&apikey=fdb29024 ";
        }

    }
})();