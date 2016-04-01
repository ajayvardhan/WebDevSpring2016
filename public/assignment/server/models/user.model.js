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

    function createUser(user){
        var deferred = q.defer();
        UserModel.create(
            {username: user.username, password : user.password,
                emails: user.emails },
            function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }

        });
        return deferred.promise;
/*
        var _id = uuid.v1();
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

/*        for (var user in data){
            if(data[user]._id == id){
                return data[user];
            }
        }
        return null;*/
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

        /*for (var user in data){
            if(data[user].username == username){
                return data[user];
            }
        }
        return null;*/
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

        /*for (var user in data){
            if(data[user].username == credentials.username && data[user].password == credentials.password){
                return data[user];
            }
        }
        return null;*/
    }

    function updateUser(id, user) {
        var deferred = q.defer();
        UserModel.update(
            {_id : id},
            {
                $set: {
                    password: user.password,
                    firstName : user.firstName,
                    lastName: user.lastName,
                    $push: { emails: user.emails }
                }
            },
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
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

        /*for (var u in data){
            if(data[u]._id == id){
                data.splice(data.indexOf(data[u]), 1);
            }
        }
        return data;*/
    }
};