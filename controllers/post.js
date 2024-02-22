const Comment = require("../models/Comment");
const Post = require("../models/Post")

const { isValidObjectId } = require("mongoose");

const getPost = async (req, res) => {
    const { postId } = req.params;

    if (!isValidObjectId(postId)) return res.send("Invalid request");

    try {
        const post = await Post.findById(postId);
        console.log(post)

        if (!post) return res.status(404).send("Post not found");

        res.status(200).send(post);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server error");
    }
}

const createPost = async (req, res) => {
    const creator = req.user.id; // The one who is posting
    const { media, caption } = req.body; // The media and caption for the post.

    // Media is mandatory and caption can be empty
    if (!media) return res.send("Cannot upload post without media");

    try {
        const post = new Post({
            creator,
            media,
            caption
        });

        await post.save();

        res.status(201).send(post);
    } catch (err) {
        console.error(err);

        return res.status(500).send("Internal Server error");
    }
}

const like = async (req, res) => {
    const { postId } = req.params;
    const liker = req.user.id;

    console.log(liker)
    if (!isValidObjectId(postId)) return res.send("Invalid Request");

    try {
        const post = await Post.findById(postId);

        if (!post) return res.status(404).send("Post not found");

        await post.likers.push(liker);

        await post.save();

        res.status(200).send("Success");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
}

const unlike = async (req, res) => {
    const { postId } = req.params;
    const unliker = req.user.id;

    if (!isValidObjectId(postId)) return res.send("Invalid request");

    try {
        const post = await Post.findById(postId);

        if (!post) return res.status(404).send("Post not found");

        await post.likers.pull(unliker);
        await post.save();

        res.status(200).send('Success');
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error");
    }
}

const addComment = async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;
    const creator = req.user.id;

    if (!isValidObjectId(postId)) return res.send("Invalid request");

    try {
        const comment = new Comment({
            creator,
            content
        });

        await comment.save();

        const post = await Post.findById(postId);

        if (!post) return res.send("Bad request");

        await post.comments.push(comment);
        await post.save();

        res.status(201).send(post);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
    }
}

const removeComment = async (req, res) => {
    const { commentId, postId } = req.params;
    const userId = req.user._id;

    if (!isValidObjectId(commentId) || !isValidObjectId(postId))
        return res.send("Bad request");

    try {
        const post = await Post.findById(postId);
        const comment = await Comment.findById(commentId);

        if (!post) return res.send("Bad request");
        if (!comment.creator == userId)
            return res.status(403).send("Not authrorized");

        await post.comments.pull(commentId);
        await post.save();

        res.status(200).send("Success");
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
}

const likeComment = async (req, res) => {
    const { commentId } = req.params;

    // Person who wants to like the comment
    const liker = req.user._id;

    if (!isValidObjectId(commentId)) return res.send("Bad request");

    try {
        const comment = await Comment.findById(commentId);

        if (!comment) return res.send("Bad request");

        await comment.likers.push(liker);
        await comment.save();

        res.status(201).send("success");
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
    }
}
const unlikeComment = async (req, res) => {
    const { commentId } = req.params;

    // Person who wants to unlike the post
    const unliker = req.user._id;

    if (!isValidObjectId(commentId)) return res.send("Bad request");

    try {
        const comment = await Comment.findById(commentId);

        if (!comment) return res.send("Bad request");

        await comment.likers.pull(unliker);
        await comment.save();

        res.status(200).send("Success");
    } catch (err) {
        console.error(err);
        return res.send("Internal server Error");
    }
}

const deletePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;

    if (!isValidObjectId(postId)) return res.send("Bad request");

    try {
        const post = await Post.findById(postId);

        if (post.creator != userId) return res.send("Not authorized");

        await Post.findOneANdDelete({ _id: postId });

        res.send("Success");
    } catch (err) {
        console.error(err)
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getPost,
    createPost,
    like,
    unlike,
    addComment,
    removeComment,
    likeComment,
    unlikeComment,
    deletePost,
}