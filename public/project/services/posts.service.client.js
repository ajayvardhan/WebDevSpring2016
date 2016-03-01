(function() {
    "use strict";
    angular
        .module("NowWatching")
        .factory("PostService", PostService);

    function PostService() {
        var posts = [];
        posts = [
            {"_id":123, "title":"Aaranya Kaandam", "description":"Thiyagarajan Kumararaja"},
            {"_id":456, "title":"Jigarthanda", "description":"Karthik Subburaj"},
            {"_id":789, "title":"Aval Appadithan", "description":"Mahendran"},
            {"_id":456, "title":"Virumaandi", "description":"Kamalhaasan"},
            {"_id":456, "title":"Thillu Mullu", "description":"K Balachander"}
        ];


        var api = {
            findAllPosts: findAllPosts
        };

        return api;

        function findAllPosts(callback){
            callback(posts);
        }
    }
})();