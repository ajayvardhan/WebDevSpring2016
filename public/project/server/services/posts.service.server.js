module.exports = function(app, postsModel) {
    var auth = authenticate;

    app.get("/api/nowwatching/posts", findAllPosts);
    app.get("/api/nowwatching/:userID/posts", findAllPostsForUser);
    app.get("/api/nowwatching/posts/search", findPosts);
    app.get("/api/nowwatching/posts/:id", findPostByID);
    app.post("/api/nowwatching/:userID/posts", auth, addPost);
    app.post("/api/nowwatching/posts/:id/comments", auth, addComment);
    app.delete("/api/nowwatching/posts/:id", auth, deletePost);

    function authenticate(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function deletePost(req, res){
        postsModel.deletePost(req.params.id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function addComment(req, res){
        postsModel.addComment(req.params.id ,req.body.comment)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }


    function findAllPosts(req, res){
        postsModel.findAllPosts()
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllPostsForUser(req, res){
        postsModel.findAllPostsForUser(req.params.userID)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function findPosts(req, res){
        postsModel.findPosts(req.query.search)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function findPostByID(req, res){
        postsModel.findPostByID(req.params.id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function addPost(req, res){
        postsModel.addPost(req.body)
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