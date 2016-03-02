(function() {
    "use strict";
    angular
        .module("NowWatching")
        .factory("PostService", PostService);

    function PostService() {
        var posts = [];
        posts = [
            {"_id":123, "userID":123, "title":"Aaranya Kaandam", "description":"Thiyagarajan Kumararaja"},
            {"_id":456, "userID":123, "title":"Jigarthanda", "description":"Karthik Subburaj"},
            {"_id":789, "userID":234, "title":"Aval Appadithan", "description":"Mahendran"},
            {"_id":456, "userID":345, "title":"Virumaandi", "description":"Kamalhaasan"},
            {"_id":456, "userID":345, "title":"Thillu Mullu", "description":"K Balachander"}
        ];


        return {
            findAllPosts: findAllPosts,
            findPosts: findPosts,
            findAllPostsForUser: findAllPostsForUser,
            addPost: addPost
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

        function addPost(post, userID, callback){
            var newPost = {
                _id: (new Date).getTime(),
                userID: userID,
                title: post.title,
                description: post.description
            };
            posts.push(newPost);
            callback();
        }
    }
})();