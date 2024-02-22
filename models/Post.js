const { Schema, model } = require("mongoose");

const postSchema = new Schema({
    media: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        default: ""
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    likers: {
        type: [Schema.Types.ObjectId],
        ref: "User",
        default: []
    },
    comments: {
        type: [Schema.Types.ObjectId],
        ref: "Comment"
    }
});

const Post = new model("Post", postSchema);

module.exports = Post;