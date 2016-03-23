var q = require("q");

module.exports = function(db, mongoose) {

    var PostSchema = require("./post.schema.server.js")(mongoose);

    var PostModel = mongoose.model('Post', PostSchema);

    return {
        findAllPosts :findAllPosts,
        findAllPostsForUser: findAllPostsForUser,
        findPosts: findPosts,
        findPostByID: findPostByID,
        addPost: addPost,
        addComment: addComment,
        deletePost: deletePost
    };

    function deletePost(id){
        var deferred = q.defer();
        PostModel.delete({_id : id},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }

    function addComment(id, comment){
        var deferred = q.defer();
        PostModel.findOneAndUpdate(
            {_id : id}, { $push: { comments: comment.comment } },
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    /*    function updatePost(post){
     for (var p in posts) {
     if (posts[p]._id == post._id) {
     posts[p].title = post.title;
     posts[p].description = post.description;
     posts[p].comments = [post.comments];
     }
     }
     return posts;
     }*/

    function findAllPosts(){
        var deferred = q.defer();
        PostModel.find(function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }

        });
        return deferred.promise;
    }

    function findAllPostsForUser(userID){
        var deferred = q.defer();
        PostModel.find({userID : userID},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }

    function findPosts(search){
        var deferred = q.defer();
        PostModel.find(
            {$or : [{title :  { $regex: new RegExp("^" + search.toLowerCase(), "i") }},
                {description : { $regex: new RegExp("^" + search.toLowerCase(), "i") }}]},
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function findPostByID(id){
        var deferred = q.defer();
        PostModel.findOne({_id : id},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }

    function addPost(post){
        var deferred = q.defer();
        PostModel.create(post, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }

        });
        return deferred.promise;
    }

};