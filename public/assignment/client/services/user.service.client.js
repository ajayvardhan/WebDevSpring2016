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
            findUserByID: findUserByID,
            addUser: addUser,
            modifyUser: modifyUser
        };

        return api;

        function logout(){
            return $http.post("/api/assignment/logout");
        }

        function getCurrentUser(){
            return $http.get("/api/assignment/loggedin");
        }

        function setCurrentUser(user){
            $rootScope.currentUser = user;
        }

        function modifyUser(user){
            return $http.put("/api/assignment/admin/user/" + user._id, user);
        }

        function addUser(user){
            return $http.post("/api/assignment/admin/user", user);
        }

        function findUserByID(userId){
            return $http.get("/api/assignment/admin/user/" + userId);
        }

        function findUserByUsername(username){
            return $http.get("/api/assignment/user?username=" + username);
        }

        function findUserByCredentials(user) {
            return $http.post("/api/assignment/login", user);
        }

        function findAllUsers(){
            return $http.get("/api/assignment/admin/user");
        }

        function createUser(user) {
            return $http.post("/api/assignment/register", user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/admin/user/" + userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/user/" + userId, user);
        }

    }
})();