module.exports = function(mongoose) {

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        watchlist: [String],
        following: [String]
    }, {collection: 'project.nowwatching.user'});
    
    return UserSchema;
};