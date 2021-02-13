const express = require('express');

const server = express();
const usersRouter = require("./users/users-router")
const postsRouter = require("./posts/posts-router")

server.use(express.json())
const { logger } = require("./middleware/middleware")
server.use(logger)

server.use("/api/users", usersRouter)
server.use("/api/posts", postsRouter)

// Catch error

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
