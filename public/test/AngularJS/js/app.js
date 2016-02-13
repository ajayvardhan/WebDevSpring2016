/**
 * Created by ajyva on 2/10/2016.
 */

(function(){
    angular
        .module("movieApp",[])
        .controller("movieController", movieController);

    function movieController($scope){
        var movies=[
            {title: "Star Wars",
            year: "2016"},
            {title: "Inception",
            year: "2010"}
        ];

        $scope.addMovie = addMovie;
        $scope.removeMovie = removeMovie;
        $scope.selectMovie = selectMovie;
        $scope.updateMovie = updateMovie;

        $scope.movies = movies;
        function addMovie(movie){
            var newMovie =
                {
                    title: movie.title,
                    year: movie.year
                }
            $scope.movie={};
            $scope.movies.push(newMovie);
        }

        function removeMovie(movie){
            var index = $scope.movies.indexOf(movie);
            $scope.movies.splice(index);
        }

        function selectMovie(movie){
            $scope.selectedmovie = movie;
        }

        function updateMovie(movie){
            $scope.selectedmovie = movie;
        }
    }

})()