(function() {
    "use strict";
    angular
        .module("NowWatching")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/users", {
                templateUrl: "views/users/users.view.html",
                controller: "UsersController"
            })
            .when("/posts", {
                templateUrl: "views/posts/posts.view.html",
                controller: "PostsController"
            })
            .when("/profile", {
                templateUrl: "views/users/editProfile.view.html",
                controller: "EditProfileController"
            })
            .when("/profile/:id", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController"
            })
            .when("/search/:key", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController"
            })
            .when("/movie/:id", {
                templateUrl: "views/movie/movie.view.html",
                controller: "MovieController"
            })

            .otherwise({
                redirectTo: "/home"
            });
    }
})();