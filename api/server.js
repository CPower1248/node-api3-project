const express = require('express');

const server = express();
const usersRouter = require("./users/users-router")
const postsRouter = require("./posts/posts-router")

server.use(express.json())

const { logger } = require("./middleware/middleware")
server.use("/api/users", logger, usersRouter)
server.use("/api/posts", logger, postsRouter)

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
