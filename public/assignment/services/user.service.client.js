(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService(){
        var users = [
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]		},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]		},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]		},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]		}
        ];


        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return api;


        function findUserByCredentials(username, password, callback){
            var found = false;
            for (var user in users){
                if(users[user].username===username && users[user].password===password){
                    found = true;
                    callback(users[user]);
                }
                if(!found){
                    callback(null);
                }
            }
        }

        function findAllUsers(callback){
            callback(users);
        }

        function createUser(user, callback){
            var _id = (new Date).getTime();
            var username = user.username;
            var password = user.password;

            var newUser = {_id : _id,
                username : username, password : password};

            users.push(newUser);
            callback(newUser);
        }

        function deleteUserById(userId, callback){
            for (var user in users) {
                if (users[user]._id === userId) {
                    var index = users.indexOf(user);
                    users.splice(index, 1);
                }
            }
            callback(users);
        }

        function updateUser(userId, user, callback){
            for (var u in users) {
                if (users[u]._id === userId) {
                    users[u] = {_id : userId,
                        firstName : user.firstName, lastName : user.lastName,
                        username : user.username, password : user.password,
                        roles : user.roles};
                }
            }
            callback(user);
        }
    }
})();