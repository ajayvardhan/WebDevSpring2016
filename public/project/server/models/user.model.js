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
        deleteUser: deleteUser,
        findUserByName : findUserByName,
        followUser: followUser,
        addMovieToWatchlist: addMovieToWatchlist
    };

    return api;

    function addMovieToWatchlist(userID, movieID){
        var deferred = q.defer();
        UserModel.findOneAndUpdate(
            {_id : userID}, { $push: { watchlist: movieID }},
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function followUser(userID, followID){
        var deferred = q.defer();
        UserModel.findOneAndUpdate(
            {_id : userID}, { $push: { following: followID }},
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function findUserByName(name){
        var deferred = q.defer();
        UserModel.find(
            {$or : [{firstName :  { $regex: new RegExp("^" + name.toLowerCase(), "i") }},
                {lastName : { $regex: new RegExp("^" + name.toLowerCase(), "i") }},
                {username : { $regex: new RegExp("^" + name.toLowerCase(), "i") }}]},
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;/*
         var foundUsers = [];
         for (var user in data){
         var firstName = data[user].firstName.toLowerCase();
         var lastName = data[user].lastName.toLowerCase();
         if (firstName.indexOf(name) != -1 || lastName.indexOf(name) != -1){
         foundUsers.push(data[user]);
         }
         }
         return foundUsers;*/
    }

    function createUser(user){
        var deferred = q.defer();
        UserModel.create(user, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }

        });
        return deferred.promise;

        /*var _id = uuid.v1();
         var username = user.username;
         var password = user.password;

         var newUser = {_id : _id,
         username : username,
         password : password
         };

         data.push(newUser);
         return data;*/
    }

    function findAllUsers(){
        var deferred = q.defer();
        UserModel.find(function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }

        });
        return deferred.promise;
    }

    function findUserByID(id){
        var deferred = q.defer();
        UserModel.findById(id,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }

    function findUserByUsername(username){
        var deferred = q.defer();
        UserModel.findOne({username : username},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        UserModel.findOne(
            { username: credentials.username,
                password: credentials.password },
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    /*
     for (var user in data){
     if(data[user].username == credentials.username && data[user].password == credentials.password){
     return data[user];
     }
     }
     return null;*/

    function updateUser(id, user) {
        var deferred = q.defer();
        UserModel.findOneAndUpdate(
            {_id : id}, {password : user.password, firstName : user.firstName, lastName: user.lastName},
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
        /*for (var u in data){
         if(data[u]._id == id){
         data[u] = user;
         }
         }
         return data;*/
    }

    function deleteUser(id) {
        var deferred = q.defer();
        UserModel.delete({_id : id},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }
};