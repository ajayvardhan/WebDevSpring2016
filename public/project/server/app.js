module.exports = function(app, db, mongoose) {
    var userModel    = require("./models/user.model.js")(db, mongoose);
    var postsModel    = require("./models/posts.model.js")(db, mongoose);

    var userService  = require("./services/user.service.server.js")(app, userModel);
    var postsService  = require("./services/posts.service.server.js")(app, postsModel);
};