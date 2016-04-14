(function() {
    "use strict";
    angular
        .module("NowWatching")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/posts", {
                templateUrl: "views/posts/posts.view.html",
                controller: "PostsController",
                controllerAs: "model"
            })
            .when("/post/:id", {
                templateUrl: "views/posts/post.view.html",
                controller: "PostController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/users/editProfile.view.html",
                controller: "EditProfileController",
                controllerAs: "model"
            })
            .when("/profile/:id", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/movie/:id", {
                templateUrl: "views/movie/movie.view.html",
                controller: "MovieController",
                controllerAs: "model"
            })

            .otherwise({
                redirectTo: "/home"
            });

    }
})();