(function() {
    "use strict";
    angular
        .module("NowWatching")
        .factory("UserService", UserService);

    function UserService() {
        var users = [];
        users = [
            {	"_id":123, "firstName":"Ajay", "lastName":"Vardhan",
                "username":"ajay",  "password":"ajay", "watchlist": [], "following": []},
            {	"_id":234, "firstName":"Rajinikanth", "lastName":"",
                "username":"rajini",    "password":"rajini", "watchlist": [], "following": []},
            {	"_id":345, "firstName":"Kamal", "lastName":"Haasan",
                "username":"kamal","password":"kamal", "watchlist": [], "following": []}
        ];


        return {
            findUserByCredentials: findUserByCredentials,
            createUser: createUser,
            findAllUsers: findAllUsers,
            updateUser: updateUser,
            findUser: findUser,
            findUserByID: findUserByID,
            deleteUser: deleteUser
        };

        function findAllUsers(callback){
            callback(users);
        }

        function findUserByID(id, callback){
            for (var user in users){
                if (users[user]._id == id){
                    callback(users[user]);
                }
            }
        }


        function findUserByCredentials(username, password, callback) {
            var loggedinUser = null;
            for (var user in users){
                if(users[user].username === username && users[user].password === password){
                    loggedinUser = users[user];
                }
                callback(loggedinUser);
            }
        }

        function createUser(user, callback) {
            var _id = (new Date).getTime();

            var newUser = {_id : _id,
                username : user.username,
                password : user.password,
                firstName : user.firstName,
                lastName : user.lastName
            };

            users.push(newUser);
            callback(newUser);
        }

        function updateUser(userId, user, callback) {
            for (var u in users) {
                if (users[u]._id === userId) {
                    users[u] = {_id : userId,
                        firstName : user.firstName, lastName : user.lastName,
                        username : user.username, password : user.password};
                }
            }
            callback();
        }

        function findUser(name, callback){
            var foundUsers = [];
            for (var user in users){
                var firstName = users[user].firstName.toLowerCase();
                var lastName = users[user].lastName.toLowerCase();
                if (firstName.indexOf(name) != -1 || lastName.indexOf(name) != -1){
                    foundUsers.push(users[user]);
                }
            }
            callback(foundUsers);
        }

        function deleteUser(id, callback){
            for (var u in users) {
                if (users[u]._id === id) {
                    users.splice(users.indexOf(users[u]),1);
                }
            }
            callback();
        }
    }
})();