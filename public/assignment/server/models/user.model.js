var q = require("q");

module.exports = function(db, mongoose) {

    var UserSchema = require("./user.schema.server.js")(mongoose);

    var UserModel = mongoose.model('User', UserSchema);

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

    function createUser(user) {
        return UserModel.create(user);
    }
    
    function findAllUsers(){
        return UserModel.find();
    }

    function findUserByID(id){
        return UserModel.findById(id);
    }

    function findUserByUsername(username){
        return UserModel.findOne({username: username});
    }

    function findUserByCredentials(credentials) {
        return UserModel.findOne(
            {
                username: credentials.username,
                password: credentials.password
            }
        );
    }

    function updateUser(id, user) {
        return UserModel.update({_id: id},
            {
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                emails: user.emails,
                roles: user.roles
            });
    }

    function deleteUser(id) {
        return UserModel.remove({_id: id});
    }
};