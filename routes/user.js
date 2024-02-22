const express = require("express");
const isLoggedIn = require("../middlewares/auth");
const router = express.Router();
const {
    getUserProfile,
    follow,
    unfollow,
    deleteAccount,
    updatePassword,
    checkOldPassword,
} = require("../controllers/user");

// get user profile
router.get("/:userId", isLoggedIn, (req, res) => getUserProfile(req, res));

// follow unfollow another profiles
router.patch("/follow/:userId", isLoggedIn, (req, res) => follow(req, res));
router.patch("/unfollow/:userId", isLoggedIn, (req, res) => unfollow(req, res));

// Account management
router.delete("/delete-account", isLoggedIn, (req, res) => deleteAccount(req, res))
router.patch("/update-password", isLoggedIn, (req, res) => updatePassword(req, res));
router.post("/check-old-pass", isLoggedIn, (req, res) => checkOldPassword(req, res));


module.exports = router;