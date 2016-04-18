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
                controllerAs: "model",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/posts", {
                templateUrl: "views/posts/posts.view.html",
                controller: "PostsController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/post/:id", {
                templateUrl: "views/posts/post.view.html",
                controller: "PostController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/profile", {
                templateUrl: "views/users/editProfile.view.html",
                controller: "EditProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/profile/:id", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/movie/:id", {
                templateUrl: "views/movie/movie.view.html",
                controller: "MovieController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })

            .otherwise({
                redirectTo: "/home"
            });
    }


        var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
        {
            var deferred = $q.defer();

            $http.get('/api/nowwatching/loggedin')
                .success(function(user)
                {
                    if (user !== '0')
                    {
                        $rootScope.currentUser = user;
                        deferred.resolve();
                    }
                    else
                    {
                        deferred.reject();
                        $location.url('/login');
                    }
                });

            return deferred.promise;
        };

        var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
        {
            var deferred = $q.defer();

            $http.get('/api/nowwatching/loggedin').success(function(user)
            {
                if (user !== '0')
                {
                    $rootScope.currentUser = user;
                }
                deferred.resolve();
            });

            return deferred.promise;
        };

})();