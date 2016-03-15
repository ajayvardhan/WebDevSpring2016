module.exports = function(app) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserByID);
    app.get("/api/assignment/user?username=username", findUserByUsername);
    app.get("/api/assignment/user?username=alice&password=wonderland", findUserByCredentials);
    app.post("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    function createUser(req, res){
        console.log(req.body);
    }

    function findAllUsers(req, res){
        console.log("users");
    }

    function findUserByID(req, res){
        console.log(req.params.id);
    }

    function findUserByUsername(req, res){
        console.log(req.params.username);
    }

    function findUserByCredentials(req, res){
        console.log(req.params.username, req.params.password);
    }

    function updateUser(req, res){
        console.log(req.body, req.params.id);
    }

    function deleteUser(req, res){
        console.log(req.params.id);
    }
};