var q = require("q");

module.exports = function(db, mongoose) {

    var UserSchema = require("./user.schema.server.js")(mongoose);

    var UserModel = mongoose.model('MovieUser', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserByID: findUserByID,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByName : findUserByName,
        followUser: followUser,
        addMovieToWatchlist: addMovieToWatchlist,
        removeMovieFromWatchlist: removeMovieFromWatchlist,
        unfollowUser: unfollowUser
    };

    return api;

    function unfollowUser(userID, followID){
        return UserModel.update({_id: userID},
            {
                $pull: { following: followID }
            });
    }

    function removeMovieFromWatchlist(userID, movieID){
        return UserModel.update({_id: userID},
            {
                $pull: { watchlist: movieID }
            });
    }

    function addMovieToWatchlist(userID, movieID){
        return UserModel.update({_id: userID},
            {
                $push: { watchlist: movieID }
            });
    }

    function followUser(userID, followID){
        return UserModel.update({_id: userID},
            {
                $push: { following: followID }
            });
    }

    function findUserByName(name){
        return UserModel.find(
            {$or :
                [
                    {firstName :  { $regex: new RegExp("^" + name.toLowerCase(), "i")}},
                    {lastName : { $regex: new RegExp("^" + name.toLowerCase(), "i") }},
                    {username : { $regex: new RegExp("^" + name.toLowerCase(), "i") }}
                ]
            }
        );
    }

    function createUser(user){
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
                lastName: user.lastName
            });
    }

    function deleteUser(id) {
        return UserModel.remove({_id: id});
    }
};