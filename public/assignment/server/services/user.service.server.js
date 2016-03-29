module.exports = function(app, userModel) {
    app.get("/api/assignment/user", findUserByCredentials);
    app.get("/api/assignment/loggedin", getCurrentUser);
    app.put("/api/assignment/user/:id", updateUser);
    app.get("/api/assignment/user", findUserByUsername);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/", findUserByCredentials);
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user/:id", findUserByID);
    app.delete("/api/assignment/user/:id", deleteUser);
    app.post("/api/assignment/logout", logout);

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

        /*var user = userModel
                    .findUserByCredentials({
                        username : req.query.username,
                        password: req.query.password
                    });
        req.session.currentUser = user;
        res.json(user);*/
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

        /*var users = userModel.createUser(req.body);
        req.session.currentUser = req.body;
        res.json(users);*/
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

        /*var users = userModel.findAllUsers();
        res.json(users);*/
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

        /*var user = userModel.findUserByID(req.params.id);
        res.json(user);*/
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

        /*var user = userModel.findUserByID(req.query.username);
        res.json(user);*/
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

        /*var users = userModel.deleteUser(req.params.id);
        res.json(users);*/
    }
};