(function() {
    "use strict";
    angular
        .module("NowWatching")
        .factory("UserService", UserService);

    function UserService() {
        var users = [];
        users = [
            {	"_id":123, "firstName":"Ajay", "lastName":"Vardhan",
                "username":"ajay",  "password":"ajay"},
            {	"_id":234, "firstName":"Rajinikanth", "lastName":"",
                "username":"rajini",    "password":"rajini"},
            {	"_id":345, "firstName":"Kamal", "lastName":"Haasan",
                "username":"kamal","password":"kamal"}
        ];


        var api = {
            findUserByCredentials: findUserByCredentials,
            createUser: createUser,
            findAllUsers: findAllUsers
        };

        return api;

        function findAllUsers(callback){
            callback(users);
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
            var username = user.username;
            var password = user.password;
            var email = user.email;

            var newUser = {_id : _id,
                username : username,
                password : password,
                email: email
            };

            users.push(newUser);
            callback(newUser);
        }

    }
})();