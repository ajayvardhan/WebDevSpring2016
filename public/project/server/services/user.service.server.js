module.exports = function(app, userModel) {
    app.get("/api/nowwatching/user", findAllUsers);
    app.get("/api/nowwatching/user/credentials", findUserByCredentials);
    app.get("/api/nowwatching/user/:id", findUserByID);
    app.get("/api/nowwatching/user/name/:name", findUserByName);
    app.get("/api/nowwatching/loggedin", getCurrentUser);
    app.post("/api/nowwatching/user/loggedin", setCurrentUser);
    app.put("/api/nowwatching/user/:id", updateUser);
    app.get("/api/nowwatching/user/username/:username", findUserByUsername);
    app.get("/api/nowwatching/", findUserByCredentials);
    app.post("/api/nowwatching/user", createUser);
    app.delete("/api/nowwatching/user/:id", deleteUser);
    app.post("/api/nowwatching/logout", logout);
    app.put("/api/nowwatching/user/:userID/follow/:followID", followUser);
    app.put("/api/nowwatching/user/:userID/unfollow/:followID", unfollowUser);
    app.put("/api/nowwatching/user/:userID/watchlist/:movieID", addMovieToWatchlist);
    app.put("/api/nowwatching/user/:userID/watchlist/delete/:movieID", removeMovieFromWatchlist);

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

    function setCurrentUser(req, res){
        req.session.currentUser = req.body;
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
        req.session.destroy();
        res.send(null);
    }

    function getCurrentUser(req, res){
        if (req.session.currentUser){
            res.json(req.session.currentUser);
        }
        else{
            res.send(null);
        }

    }

    function findUserByCredentials(req, res){
        userModel.findUserByCredentials({
                username : req.query.username,
                password: req.query.password
            })
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function createUser(req, res){
        userModel.createUser(req.body)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function ( err ) {
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
        userModel.updateUser(req.params.id, req.body)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
        /*var users = userModel.updateUser(req.params.id, req.body);
        req.session.currentUser = req.body;
        res.json(users);*/
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