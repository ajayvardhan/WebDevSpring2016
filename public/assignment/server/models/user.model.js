var data = require("./user.mock.json");

module.exports = function() {
    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserByID: findUserByID,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        deleteUser: deleteUser
    };

    return api;

    function createUser(user){
        var _id = Guid.raw();
        var username = user.username;
        var password = user.password;

        var newUser = {_id : _id,
            username : username,
            password : password
        };

        data.push(newUser);
        return data;
    }

    function findAllUsers(){
        return data;
    }

    function findUserByID(id){
        for (var user in data){
            if(data[user]._id === id){
                return data[user];
            }
        }
        return null;
    }

    function findUserByUsername(username){
        for (var user in data){
            if(data[user].username === username){
                return data[user];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        for (var user in data){
            if(data[user].username === credentials.username && data[user].password === credentials.password){
                return data[user];
            }
        }
        return null;
    }

    function updateUser(id, user) {
        for (var u in data){
            if(data[u]._id === id){
                data[u] = user;
            }
        }
        return data;
    }

    function deleteUser(id) {
        for (var u in data){
            if(data[u]._id === id){
                data.splice(data.indexOf(data[u]), 1);
            }
        }
        return data;
    }
};