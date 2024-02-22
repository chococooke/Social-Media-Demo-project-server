const User = require("../models/User");
const { hashSync, compareSync } = require("bcrypt");
const { sign } = require("../utils/jwt")

// GET METHODS
const g_signUp = (req, res) => {
    res.send("this is a signup page");
}

// POST METHODS
const p_signUp = async (req, res) => {
    const { name, username, password } = req.body;

    if (!name || !username || !password) return res.send("Fields cannot be empty");

    try {
        const user = new User(req.body);
        await user.save();

        res.status(201).send(user);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server error");
    }
}

const p_login = async (req, res) => {
    const { uname, passwd } = req.body;

    if (!uname || !passwd) return res.send("Username and Password are required");

    try {
        const foundUser = await User.findOne({ username: uname });

        if (!foundUser) return res.send("Bad credentials");

        const { _id, username, name, password } = foundUser;
        const match = await compareSync(passwd, password);

        if (!match) return res.send("Bad credentials");

        const token = await sign({ _id, name, username });

        res.cookie('jwt', token);
        res.status(200).send('Logged In');
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = { g_signUp, p_signUp, p_login };