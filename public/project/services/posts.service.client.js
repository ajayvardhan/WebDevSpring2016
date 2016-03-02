(function() {
    "use strict";
    angular
        .module("NowWatching")
        .factory("PostService", PostService);

    function PostService() {
        var posts = [];
        posts = [
            {"_id":123, "userID":123, "title":"Fight Club", "description":"Thiyagarajan Kumararaja",
                "comments": [1,2,3]},
            {"_id":456, "userID":123, "title":"The Dark Knight", "description":"Karthik Subburaj",
                "comments": []},
            {"_id":789, "userID":234, "title":"The Prestige", "description":"Mahendran",
                "comments": []},
            {"_id":234, "userID":345, "title":"A Clockwork Orange", "description":"Kamalhaasan",
                "comments": []},
            {"_id":345, "userID":345, "title":"Pulp Fiction", "description":"K Balachander",
                "comments": []}
        ];


        return {
            findAllPosts: findAllPosts,
            findPosts: findPosts,
            findAllPostsForUser: findAllPostsForUser,
            addPost: addPost,
            findPostByID: findPostByID,
            addComment: addComment,
            deletePost: deletePost,
            updatePost: updatePost
        };

        function findAllPosts(callback){
            callback(posts);
        }


        function findAllPostsForUser(id, callback){
            var foundPosts = [];
            for (var post in posts){
                if (posts[post].userID == id){
                    foundPosts.push(posts[post]);
                }
            }
            callback(foundPosts);
        }


        function findPosts(keyword, callback){
            var foundPosts = [];
            for (var post in posts){
                var title = posts[post].title.toLowerCase();
                if (title.indexOf(keyword) != -1){
                    foundPosts.push(posts[post]);
                }
            }
            callback(foundPosts);
        }

        function findPostByID(id, callback){
            for (var post in posts){
                if (posts[post]._id == id){
                    callback(posts[post]);
                }
            }
        }

        function addPost(post, userID, callback){
            var newPost = {
                _id: (new Date).getTime(),
                userID: userID,
                title: post.title,
                description: post.description,
                comments: [post.comments]
            };
            posts.push(newPost);
            callback();
        }

        function updatePost(post, callback) {
            for (var p in posts) {
                if (posts[p]._id == post._id) {
                    posts[p].title = post.title;
                    posts[p].description = post.description;
                    posts[p].comments = [post.comments];
                }
            }
            callback();
        }

        function addComment(id, comment, callback){
            for (var post in posts){
                if (posts[post]._id == id){
                    posts[post].comments.push(comment);
                }
            }
            callback(comment);
        }

        function deletePost(id, callback){
            for (var post in posts) {
                if (posts[post]._id === id) {
                    posts.splice(posts.indexOf(posts[post]),1);
                }
            }
            callback();
        }


    }
})();