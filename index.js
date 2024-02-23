const express = require("express");
const { createServer } = require("http");
const connectDB = require("./db/index.js");
require("dotenv").config();

const authRouter = require("./routes/auth.js");
const userRouter = require("./routes/user.js");
const postRouter = require("./routes/post.js");

const app = express();
const server = createServer(app);

connectDB(process.env.DB_URL);

app.use(express.json());
app.use("/auth", authRouter)
app.use("/user", userRouter)
app.use("/post", postRouter)

server.listen(5000, () => {
    console.log("[+] SERVER LISTENING ON 3000");
})