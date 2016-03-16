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
        data.push(user);
        return data;
    }

    function findAllUsers(){
    }

    function findUserByID(id){
    }

    function findUserByUsername(username){
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
    }
};