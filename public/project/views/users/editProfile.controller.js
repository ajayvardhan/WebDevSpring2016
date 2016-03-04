(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("EditProfileController", EditProfileController);

    function EditProfileController($scope, $location, $rootScope, MovieService, UserService) {
        $scope.update = update;
        $scope.user = $rootScope.currentUser;
        $scope.goToWatchlist = goToWatchlist;
        $scope.goToFollowing = goToFollowing;
        $scope.goToFollowers = goToFollowers;
        $scope.goToItem = goToItem;
        $scope.removeMovie = removeMovie;

        function update(user) {
            UserService.updateUser(user._id, user,
                function(response) {
                    $rootScope.currentUser = response;
                });
        }

        function goToWatchlist() {
            $scope.listItems = [];
            for (var l in $scope.user.watchlist) {
                MovieService.findMovieByImdbID($scope.user.watchlist[l], function(response){
                    $scope.listItems.push({imdbID: response.imdbID, first: response.Title});
                });
            }
        }

        function goToFollowing(){
            $scope.listItems = [];
            var listItems = [];
            for (var f in $rootScope.currentUser.following){
                UserService.findUserByID($rootScope.currentUser.following[f],function(response){
                        listItems.push(response);
                    }
                );
            }
            for (var l in listItems){
                $scope.listItems.push({
                    _id : listItems[l]._id,
                    first : listItems[l].firstName,
                    second : listItems[l].lastName
                });
            }
        }

        function goToFollowers(){
            $scope.listItems = [];
            var listItems = [];
            UserService.findAllUsers(function(response){
                for (var u in response){
                    if (response[u].following.indexOf($rootScope.currentUser._id) != -1){
                        listItems.push(response[u]);
                    }
                }
            });
            for (var l in listItems){
                $scope.listItems.push({
                    _id : listItems[l]._id,
                    first : listItems[l].firstName,
                    second : listItems[l].lastName
                });
            }
        }

        function goToItem(item){
            if(item._id){
                $location.url("/profile/" + item._id);
            }
            else{
                MovieService.findMovieByTitle(item.first, function(response){
                    if (response.imdbID) {
                        $location.url("/movie/" + response.imdbID);
                    }
                    else {
                        $scope.message = "Movie not found";
                    }
                })
            }
        }

        function removeMovie(movie){
            $rootScope.currentUser.watchlist.splice($rootScope.currentUser.watchlist.indexOf(movie.imdbID),1);
            goToWatchlist();
        }
    }
})();