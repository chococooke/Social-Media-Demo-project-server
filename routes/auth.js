const express = require("express");

const {
    p_signUp,
    p_login
} = require("../controllers/auth");
const isLoggedIn = require("../middlewares/auth");

const router = express.Router();

// login and signup
router.post("/signup", (req, res) => p_signUp(req, res));
router.post("/login", (req, res) => p_login(req, res));

// password update
router.patch("/update-password", isLoggedIn, (req, res) => updatePassword(req, res))

// update info
router.put("/update profile", isLoggedIn, (req, res) => udpateProfile(req, res));


module.exports = router;