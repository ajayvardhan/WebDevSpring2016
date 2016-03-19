(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {

        var api = {
            findUserByCredentials: findUserByCredentials,
            setCurrentUser: setCurrentUser,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserByUsername: findUserByUsername,
            getCurrentUser: getCurrentUser,
            logout: logout,
            findUserByID: findUserByID
        };

        return api;

        function logout(){
            return $http.post("/api/assignment/logout");
        }

        function getCurrentUser(){
            return $http.get("/api/assignment/loggedin");
        }

        function setCurrentUser(user){
            console.log(user);
            $rootScope.currentUser = user;
        }

        function findUserByID(userId){
            return $http.get("/api/assignment/user/" + userId);
        }

        function findUserByUsername(username){
            return $http.get("/api/assignment/user?username=" + username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
        }

        function findAllUsers(){
            return $http.get("/api/assignment/user");
        }

        function createUser(user) {
            return $http.post("/api/assignment/user", user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/" + userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/user/" + userId, user);
        }

    }
})();