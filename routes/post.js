const router = require('express').Router();
const {
    createPost,
    like,
    unlike,
    getPost,
    addComment,
    removeComment,
    deletePost,
    likeComment,
    unlikeComment
} = require("../controllers/post");
const isLoggedIn = require('../middlewares/auth');

// get a post
router.get("/:postId", isLoggedIn, (req, res) => getPost(req, res));

// create new  post
router.post("/create-new-post", isLoggedIn, (req, res) => createPost(req, res));

// Like and unlike posts
router.patch("/like-post/:postId", isLoggedIn, (req, res) => like(req, res));
router.patch("/unlike-post/:postId", isLoggedIn, (req, res) => unlike(req, res));


// add and remove comments
router.patch("/add-comment/:postId", isLoggedIn, (req, res) => addComment(req, res));
router.delete("/remove-comment/:postId/:commentId", isLoggedIn, (req, res) => removeComment(req, res));

// like/unlike comments
router.patch("/like-comment/:commentId", isLoggedIn, (req, res) => likeComment(req, res));
router.patch("/unlike-comment/:commentId", isLoggedIn, (req, res) => unlikeComment(req, res));


// delete the entire post
router.delete("/delete-post/:id", isLoggedIn, (req, res) => deletePost(req, res))


module.exports = router;