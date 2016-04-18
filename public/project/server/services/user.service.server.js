var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, userModel) {

    var auth = authenticate;

    app.get("/api/nowwatching/user", findAllUsers);
    app.post("/api/nowwatching/user/credentials", passport.authenticate('local'), login);
    app.get("/api/nowwatching/user/:id", findUserByID);
    app.get("/api/nowwatching/user/name/:name", findUserByName);
    app.get("/api/nowwatching/loggedin", getCurrentUser);
    app.put("/api/nowwatching/user/:id", auth, updateUser);
    app.get("/api/nowwatching/user/username/:username", findUserByUsername);
    app.post("/api/nowwatching/user", createUser);
    app.delete("/api/nowwatching/user/:id", deleteUser);
    app.post("/api/nowwatching/logout", logout);
    app.put("/api/nowwatching/user/:userID/follow/:followID", auth, followUser);
    app.put("/api/nowwatching/user/:userID/unfollow/:followID", auth, unfollowUser);
    app.put("/api/nowwatching/user/:userID/watchlist/:movieID", auth, addMovieToWatchlist);
    app.put("/api/nowwatching/user/:userID/watchlist/delete/:movieID", auth, removeMovieFromWatchlist);

    function authenticate(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );


    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserByID(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function unfollowUser(req, res){
        userModel.unfollowUser(req.params.userID, req.params.followID)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function removeMovieFromWatchlist(req, res){
        userModel.removeMovieFromWatchlist(req.params.userID, req.params.movieID)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }


    function addMovieToWatchlist(req, res){
        userModel.addMovieToWatchlist(req.params.userID, req.params.movieID)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function followUser(req, res){
        userModel.followUser(req.params.userID, req.params.followID)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByName(req, res){
        userModel.findUserByName(req.params.name)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function logout(req, res){
        req.logOut();
        res.send(200);
    }

    function getCurrentUser(req, res){
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function login(req, res){
        var user = req.user;
        res.json(user);
    }

    function createUser(req, res){
        var newUser = req.body;

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                },
                function(err){
                    res.status(400).send(err);
                }
            );

    }

    function findAllUsers(req, res){
        userModel.findAllUsers()
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByID(req, res){
        userModel.findUserByID(req.params.id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByUsername(req, res){
        userModel.findUserByUsername(req.params.username)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUser(req, res){
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel.updateUser(req.params.id, req.body)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req, res){
        userModel.deleteUser(req.params.id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }
};