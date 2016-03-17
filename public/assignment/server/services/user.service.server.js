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
        var user = userModel
                    .findUserByCredentials({
                        username : req.query.username,
                        password: req.query.password
                    });
        req.session.currentUser = user;
        res.json(user);
    }

    function createUser(req, res){
        var users = userModel.createUser(req.body);
        req.session.currentUser = req.body;
        res.json(users);
    }

    function findAllUsers(req, res){
        var users = userModel.findAllUsers();
        res.json(users);
    }

    function findUserByID(req, res){
        var user = userModel.findUserByID(parseInt(req.params.id));
        res.json(user);
    }

    function findUserByUsername(req, res){
        var user = userModel.findUserByID(req.query.username);
        res.json(user);
    }

    function updateUser(req, res){
        var users = userModel.updateUser(parseInt(req.params.id), req.body);
        req.session.currentUser = req.body;
        res.json(users);
    }

    function deleteUser(req, res){
        var users = userModel.deleteUser(parseInt(req.params.id));
        res.json(users);
    }
};