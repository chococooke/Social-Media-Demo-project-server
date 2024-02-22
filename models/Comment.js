const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    likers: {
        type: [Schema.Types.ObjectId],
        ref: "User"
    }
})

const Comment = new model("Comment", commentSchema);

module.exports = Comment;