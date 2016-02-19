(function(){
    angular
        .module("SongApp", ["ngRoute"])
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when("/search", {
                templateUrl: "search.html",
                controller: "SearchController"
            });
    }
})();