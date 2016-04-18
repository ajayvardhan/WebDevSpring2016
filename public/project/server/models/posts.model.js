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
        return PostModel.remove({_id: id});
    }

    function addComment(id, comment){
        return PostModel.update({_id: id},
            {
                $push: { comments: comment }
            });
    }

    function findAllPosts(){
        return PostModel.find();
    }

    function findAllPostsForUser(userID){
        return PostModel.find({userID : userID});
    }

    function findPosts(search){
        return PostModel.find(
            {$or :
                [
                    {'movie.Title' :  { $regex: search.toLowerCase(), $options: 'i' }},
                    {description : { $regex: search.toLowerCase(), $options: 'i' }}
                ]
            }
        );
    }

    function findPostByID(id){
        return PostModel.findById(id);
    }

    function addPost(post){
        return PostModel.create(post);
    }

};