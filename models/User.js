const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
    },
    pfp: {
        type: String,
        default: ""
    },
    isAdmin: {
        type: Boolean,
        reuqired: true,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    followers: {
        type: [Schema.Types.ObjectId],
        ref: "User"
    },
    following: {
        type: [Schema.Types.ObjectId],
        ref: "User"
    }
});

const User = new model("User", userSchema);

module.exports = User;