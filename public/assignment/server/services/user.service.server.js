module.exports = function(app, userModel) {
    app.get("/api/assignment/user", findUserByCredentials);
    app.get("/api/assignment/user", findUserByUsername);
    app.get("/api/assignment/user", findAllUsers);
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user/:id", findUserByID);
    app.post("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

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
    }

    function findAllUsers(req, res){
    }

    function findUserByID(req, res){
    }

    function findUserByUsername(req, res){
    }

    function updateUser(req, res){
    }

    function deleteUser(req, res){
    }
};