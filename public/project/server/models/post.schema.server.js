module.exports = function(mongoose) {

    var PostSchema = mongoose.Schema({
        userID: String,
        title: String,
        description: String,
        comments: [String]
    }, {collection: 'project.nowwatching.posts'});

    return PostSchema;
};