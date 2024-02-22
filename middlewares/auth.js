const { verify } = require("../utils/jwt")

const isLoggedIn = async (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!req.headers.authorization) return res.status(403).send("Not authorized");

    try {
        const decodedToken = await verify(authToken);
        console.log(decodedToken)

        if (!decodedToken) return res.status(403).send("Not authorized");

        req.user = decodedToken;
        console.log(decodedToken)
        next();
    } catch (err) {
        console.error(err)
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = isLoggedIn;