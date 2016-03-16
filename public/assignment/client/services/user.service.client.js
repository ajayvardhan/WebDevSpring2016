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
            logout: logout
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

        function findUserByUsername(username){
            return $http.get("/api/assignment/user?username=" + username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
        }
        /*
            var loggedinUser = null;
            for (var user in users){
                if(users[user].username === username && users[user].password === password){
                    loggedinUser = users[user];
                }
                callback(loggedinUser);
            }
        }*/

        function findAllUsers(){
            return $http.get("/api/assignment/user");
        }

        function createUser(user) {
            return $http.post("/api/assignment/user", user);
        }
            /*
            var _id = (new Date).getTime();
            var username = user.username;
            var password = user.password;

            var newUser = {_id : _id,
                username : username,
                password : password
            };

            users.push(newUser);
            callback(newUser);
        }*/

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/" + userId);
        }

            /*for (var user in users) {
                if (users[user]._id === userId) {
                    var index = users.indexOf(users[user]);
                    users.splice(index, 1);
                }
            }
            callback(users);
        }*/

        function updateUser(userId, user) {
            return $http.put("/api/assignment/user/" + userId, user);
        }

            /*for (var u in users) {
                if (users[u]._id === userId) {
                    users[u] = {_id : userId,
                        firstName : user.firstName, lastName : user.lastName,
                        username : user.username, password : user.password,
                        roles : user.roles, email : user.email};
                }
            }
            callback(user);
        }*/
    }
})();