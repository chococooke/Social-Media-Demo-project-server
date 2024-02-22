const jwt = require("jsonwebtoken");
require("dotenv").config();

const getTokenFromHeaders = (authHeader) => {
    if (!authHeader) {
        throw new Error("Authorization headers not present");
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        throw new Error("Token is malformed");
    }

    return parts[1];
}

const sign = (payload) => new Promise((res, rej) => {
    if (payload) {
        jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
            if (err) {
                rej(err);
            } else {
                res(token)
            }
        });
    } else {
        throw new Error("Token is not present");
    }
});

const verify = (payload) => new Promise((res, rej) => {
    const token = getTokenFromHeaders(payload);

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            rej(err);
        } else {
            res(decoded)
        }
    })
});

module.exports = { verify, sign }