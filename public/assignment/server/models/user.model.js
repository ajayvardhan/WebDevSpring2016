var data = require("./user.mock.json");

module.exports = function(app) {
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
        console.log(user);
    }

    function findAllUsers(){
        console.log(data);
    }

    function findUserByID(id){
        console.log(id);
    }

    function findUserByUsername(username){
        console.log(username);
    }

    function findUserByCredentials(credentials) {
        console.log(credentials);
    }

    function updateUser(id, user) {
        console.log(id, user);
    }

    function deleteUser(id) {
        console.log(id);
    }
};