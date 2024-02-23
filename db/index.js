const mongoose = require("mongoose");

const connectDB = (url) => {
    mongoose.connect(url);
    const connection = mongoose.connection;

    connection.on('connected', () => {
        console.log(`[+] CONNECTED TO MONOGODB `)
    });

    connection.on('error', (err) => {
        console.error(err)
    })
}

module.exports = connectDB;