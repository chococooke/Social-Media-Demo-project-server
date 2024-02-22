const User = require("../models/User");
const { isValidObjectId } = require("mongoose");

const getUserProfile = async (req, res) => {
    const { userId } = req.params;

    if (!isValidObjectId(userId)) return res.send("Bad request");

    try {
        const user = await User.findById(userId);

        if (!user) return res.status(404).send("user not found");

        res.status(200).send(user);
    } catch (err) {
        console.error(err)
        return res.status(500).send("Internal server error");
    }
}


// follow unfollow
const follow = async (req, res) => {
    // Person who is following the requested person
    const follower = req.user._id

    // Person to be followed by the follower user
    const following = req.params.userId

    if (!isValidObjectId(follower) || !isValidObjectId(following))
        return res.send("Bad request");

    try {
        const followerUser = await User.findById(follower);
        const followingUser = await user.findById(following);

        await followerUser.following.push(followingUser);

        await followingUser.followers.push(followerUser);

        await followerUser.save();
        await followingUser.save();

        res.send("Success");
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Sever error");
    }
}

const unfollow = async (req, res) => {
    const following = req.params.userId;
    const follower = req.user.id;

    if (!isValidObjectId(following)) return res.send("Invalid request");

    try {
        const followerUser = await User.findById(follower);
        const followingUser = await User.findById(following);

        await followerUser.following.pull(followingUser);
        await followingUser.followers.pull(followerUser);

        await followerUser.save();
        await followingUser.save();

        res.status(200).send("Success");
    } catch (err) {
        console.log();
        return res.send("Internal Server Error");
    }
}


// account management
const deleteAccount = async (req, res) => {
    const { userId } = req.params;

    if (!isValidObjectId(userId)) return res.send("Bad request");

    // check account Ownership 
    if (userId != req.user.id) return res.send("Not authorized");

    try {
        await User.findByIdAndDelete(userId);
        res.send("Success");
    } catch (err) {
        console.log(err);
        return res.send("Internal Server Error");
    }
}


module.exports = {
    getUserProfile,
    follow,
    unfollow,
    deleteAccount,
}