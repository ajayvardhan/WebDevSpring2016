(function() {
    "use strict";
    angular
        .module("NowWatching")
        .factory("PostService", PostService);

    function PostService($http) {

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

        function findAllPosts(){
            return $http.get("/api/nowwatching/posts");
        }


        function findAllPostsForUser(id){
            return $http.get("/api/nowwatching/" + id + "/posts")
        }


        function findPosts(keyword){
            return $http.get("/api/nowwatching/posts/search?search=" + keyword);
        }

        function findPostByID(id){
            return $http.get("/api/nowwatching/posts/" + id)
        }

        function addPost(post, userID){
           return $http.post("/api/nowwatching/" + userID + "/posts", post)
        }

        function updatePost(post) {
            return $http.put("/api/nowwatching/posts", post);
        }

        function addComment(id, comment){
            return $http.post("/api/nowwatching/posts/"+id+"/comments", comment);
        }

        function deletePost(id){
            return $http.delete("/api/nowwatching/posts/" + id);
        }


    }
})();