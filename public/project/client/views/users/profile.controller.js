(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, $location, UserService, PostService, MovieService) {
        var vm = this;

        vm.posts = [];

        vm.editProfile = editProfile;
        vm.goToWatchlist = goToWatchlist;
        vm.goToFollowing = goToFollowing;
        vm.goToFollowers = goToFollowers;
        vm.goToItem = goToItem;
        vm.removeMovie = removeMovie;
        vm.followUser = followUser;
        vm.postDetails = postDetails;
        vm.goToPosts = goToPosts;
        vm.removeItem = removeItem;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    if (response.data!=0) {
                        if (response.data._id == $routeParams.id) {
                            vm.showEdit = true;
                            vm.closeButton = true;
                        }
                        if (response.data._id != $routeParams.id &&
                            response.data.following.indexOf($routeParams.id) == -1) {
                            vm.showFollow = true;
                        }
                    }

                });


            UserService
                .findUserByID($routeParams.id)
                .then(
                    function (response) {
                        vm.user = response.data;
                    });


            goToPosts()
        }

        init();


        function followUser(user){
            UserService
                .getCurrentUser()
                .then(function(response){
                    UserService
                        .followUser(response.data._id, $routeParams.id)
                        .then(
                            function(response){
                                vm.showFollow = false;
                                vm.message = "You have now followed " + user.firstName + " " + user.lastName;
                            }
                        )
                });

        }

        function postDetails(post){
            $location.url("/post/" + post._id);
        }

        function editProfile(){
            $location.url("/profile");
        }
        /*UserService
         .removeMovieFromWatchlist($routeParams.id, item.imdbID)
         .then(function(response){
         goToWatchlist();
         });*/

        function removeItem(item){
            switch(vm.searchType) {
                case "watchlist":
                    UserService
                        .removeMovieFromWatchlist($routeParams.id, item.imdbID)
                        .then(function(response){
                            vm.message = item.first +" removed from your watchlist";
                            goToWatchlist();
                        });
                    break;
                case "following":
                    UserService
                        .unfollowUser($routeParams.id, item._id)
                        .then(function(response){
                            vm.message = "You have unfollowed " + item.first + item.second;
                            goToFollowing();
                        });
                    break;
            }
        }


        function goToPosts(){
            vm.posts = [];
            vm.listItems = [];
            vm.searchType = "posts";
            PostService
                .findAllPostsForUser($routeParams.id)
                .then(
                    function (response) {
                        for (var r in response.data) {
                            updateNamesForPosts(response.data[r]);
                            updatePostersForPosts(response.data[r]);
                        }
                    });

            function updatePostersForPosts(post){
                post.movie.Poster = MovieService.findMoviePoster(post.movie.imdbID);
            }


            function updateNamesForPosts(post){
                UserService
                    .findUserByID(post.userID)
                    .then(
                        function (u) {
                            if(!u.data.firstName && !u.data.lastName){
                                post.user = u.data.username;
                            }
                            else {
                                post.user = u.data.firstName + " " + u.data.lastName;
                            }
                        });
                vm.posts.push(post);
                vm.posts = vm.posts.reverse();
            }
        }

        function goToWatchlist() {
            vm.searchType = "watchlist";
            vm.listItems = [];
            UserService
                .findUserByID($routeParams.id)
                .then(function(response){
                    for (var r in response.data.watchlist){
                        MovieService
                            .findMovieByImdbID(response.data.watchlist[r])
                            .then(
                                function(res)
                                {
                                    vm.listItems.push
                                    (
                                        {
                                            imdbID: res.data.imdbID,
                                            first: res.data.Title,
                                            poster: MovieService.findMoviePoster(res.data.imdbID)
                                        }
                                    );
                                }
                            )
                    }
                });
        }

        function goToFollowing(){
            vm.searchType = "following";
            vm.listItems = [];
            UserService
                .findUserByID($routeParams.id)
                .then(function(response){
                    for (var r in response.data.following){
                        UserService
                            .findUserByID(response.data.following[r])
                            .then(
                                function(res){
                                    if(!res.data.firstName && !res.data.lastName){
                                        vm.listItems.push({
                                            _id : res.data._id,
                                            first : res.data.username,
                                            second : ""
                                        })
                                    }
                                    else{
                                        vm.listItems.push({
                                            _id : res.data._id,
                                            first : res.data.firstName,
                                            second : res.data.lastName
                                        });}
                                }
                            )
                    }
                });
        }

        function goToFollowers(){
            vm.searchType = "followers";
            vm.listItems = [];
            UserService
                .findUserByID($routeParams.id)
                .then(function(response){
                    UserService
                        .findAllUsers()
                        .then(
                            function(res){
                                for (var r in res.data){
                                    if (res.data[r].following.indexOf(response.data._id) != -1){
                                        if(!res.data[r].firstName && !res.data[r].lastName){
                                            vm.listItems.push({
                                                _id : res.data[r]._id,
                                                first : res.data[r].username,
                                                second : ""
                                            })
                                        }
                                        else{
                                            vm.listItems.push({
                                                _id : res.data[r]._id,
                                                first : res.data[r].firstName,
                                                second : res.data[r].lastName
                                            });}
                                    }
                                }
                            }
                        );
                });
        }

        function goToItem(item){
            if(item._id){
                $location.url("/profile/" + item._id);
            }
            else{
                $location.url("/movie/" + item.imdbID);
            }
        }

        function removeMovie(movie){
            $rootScope.currentUser.watchlist.splice($rootScope.currentUser.watchlist.indexOf(movie.imdbID),1);
            goToWatchlist();
        }
    }
})();