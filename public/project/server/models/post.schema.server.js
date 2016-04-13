module.exports = function(mongoose) {

    var PostSchema = mongoose.Schema({
        userID: String,
        movie: Object,
        description: String,
        comments: [String]
    }, {collection: 'project.nowwatching.posts'});

    return PostSchema;
};