const Users = require("../users/users-model")
const Posts = require("../posts/posts-model")

function logger({ method, baseUrl, url }, res, next) {
  console.log("REQ METHOD: ", method)
  console.log("REQ URL: ", "http://localhost:5000", baseUrl, url)
  console.log("REQ TIMESTAMP: ", new Date())
  next()
}

async function validateUserId(req, res, next) {
  const { id } = req.params
  try {
    const user = await Users.getById(id)
    if (!user) {
      res.status(404).json({ errorMessage: `The user with id ${id} could not be found`})
    } else {
      req.user = user
      next()
    }
  } catch (error) {
    res.status(500).json({ error: "There was a communicating with middleware" })
  }
}

async function validateUser(req, res, next) {
  const { id } = req.params
  const { body } = req
  const user = await Users.update(id, body)
  if (!user) {
    res.status(400).json({ errorMessage: "missing user data"})
  } else if (!user.name) {
    res.status(404).json({ errorMessage: "missing required name field"})
  } else {
    req.body = user
    next()
  }
}

async function validatePostId(req, res, next) {
  const { id } = req.params
  try {
    const post = await Posts.getById(id)
    if (!post) {
      res.status(404).json({ errorMessage: `The post with id ${id} could not be found` })
    } else {
      req.post = post
      next()
    }
  } catch (error) {
    res.status(500).json({ error: "There was a communicating with middleware" })
  }
}

// WIP
function validatePost(req, res, next) {
  // do your magic!
}

module.exports = { logger, validateUserId, validateUser, validatePostId }
