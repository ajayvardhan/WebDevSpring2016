(function() {
    "use strict";
    angular
        .module("NowWatching")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {

        return {
            findUserByCredentials: findUserByCredentials,
            createUser: createUser,
            findAllUsers: findAllUsers,
            updateUser: updateUser,
            findUser: findUser,
            findUserByID: findUserByID,
            deleteUser: deleteUser,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,
            logout: logout,
            findUserByUsername: findUserByUsername,
            followUser: followUser,
            addMovieToWatchlist: addMovieToWatchlist,
            removeMovieFromWatchlist: removeMovieFromWatchlist,
            unfollowUser: unfollowUser
        };

        function unfollowUser(userID, followID){
            return $http.put("/api/nowwatching/user/" + userID + "/unfollow/" + followID);
        }

        function removeMovieFromWatchlist(userID, movieID){
            return $http.put("/api/nowwatching/user/" + userID + "/watchlist/delete/" + movieID);
        }

        function addMovieToWatchlist(userID, movieID){
            return $http.put("/api/nowwatching/user/" + userID + "/watchlist/" + movieID);
        }

        function followUser(userID, followID){
            return $http.put("/api/nowwatching/user/" + userID + "/follow/" + followID);
        }

        function findUserByUsername(user){
            return $http.get("/api/nowwatching/user/username/" + user.username);
        }

        function findAllUsers(){
            return $http.get("/api/nowwatching/user");
        }

        function findUserByID(id){
            return $http.get("/api/nowwatching/user/" +id);
        }

        function logout(){
            return $http.post("/api/nowwatching/logout");
        }

        function getCurrentUser(){
            return $http.get("/api/nowwatching/loggedin");
        }

        function setCurrentUser(user){
            $rootScope.currentUser = user;
        }
        function findUserByCredentials(username, password) {
            return $http.post("/api/nowwatching/user/credentials?username=" + username + "&password=" + password);
        }

        function createUser(user) {
            return $http.post("/api/nowwatching/user", user);
        }

        function updateUser(userId, user) {
            return $http.put("/api/nowwatching/user/" + userId, user);
        }

        function findUser(name){
            return $http.get("/api/nowwatching/user/name/" + name);
        }

        function deleteUser(id){
            return $http.delete("/api/nowwatching/user/" + id);
        }
    }
})();