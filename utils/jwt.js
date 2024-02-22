const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.JWT_SECRET;

const getTokenFromHeaders = (authHeader) => {
    if (!authHeader) throw new Error("Authorization headers not present");

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') throw new Error("Token is malformed");

    return parts[1];
}

const sign = (payload) => new Promise((res, rej) => {
    if (!payload) throw new Error("No data provided");

    try {
        const token = jwt.sign(payload, secret);
        res(token)
    } catch (error) {
        rej("No valid data")
    }
})

const verify = (payload) => new Promise((res, rej) => {
    const token = getTokenFromHeaders(payload);

    try {
        const decodedToken = jwt.verify(token, secret);
        res(decodedToken);
    } catch (err) {
        console.log(err);
        rej(err);
    }
});

module.exports = { verify, sign }