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


        UserService
            .getCurrentUser()
            .then(function(response){
                if(response.data) {
                    if (response.data._id == $routeParams.id){
                        vm.showEdit = true;
                    }
                }
            });


        UserService
            .findUserByID($routeParams.id)
            .then(
                function(response) {
                    vm.user = response.data;
                });

        PostService
            .findAllPostsForUser($routeParams.id)
            .then(
                function (response) {
                    for (var r in response.data) {
                        updateNamesForPosts(response.data[r]);
                    }
                });


        function editProfile(){
            $location.url("/profile");
        }

        function updateNamesForPosts(post){
            UserService
                .findUserByID(post.userID)
                .then(
                    function (u) {
                        if (!u.data.firstName){
                            u.data.firstName = "";
                        }
                        if (!u.data.lastName){
                            u.data.lastName = "";
                        }
                        post.user = u.data.firstName + " " + u.data.lastName;
                    });
            vm.posts.push(post);
            vm.posts = vm.posts.reverse();
        }

        UserService
            .getCurrentUser()
            .then(function(response){
                if (response.data &&
                    response.data._id != $routeParams.id &&
                    response.data.following.indexOf($routeParams.id) == -1)
                {
                    vm.showFollow = true;
                }
            });


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

        function goToWatchlist() {
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
                                            poster: res.data.Poster
                                        }
                                    );
                                }
                            )
                    }
                });
        }

        function goToFollowing(){
            vm.listItems = [];
            UserService
                .findUserByID($routeParams.id)
                .then(function(response){
                    for (var r in response.data.following){
                        UserService
                            .findUserByID(response.data.following[r])
                            .then(
                                function(res){
                                    vm.listItems.push({
                                        _id : res.data._id,
                                        first : res.data.firstName,
                                        second : res.data.lastName
                                    });
                                }
                            )
                    }
                });
        }

        function goToFollowers(){
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
                                        vm.listItems.push({
                                            _id : res.data[r]._id,
                                            first : res.data[r].firstName,
                                            second : res.data[r].lastName
                                        });
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