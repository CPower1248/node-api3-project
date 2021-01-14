const Users = require("../users/users-model")
const Posts = require("../posts/posts-model")

function logger({ method, baseUrl, url }, res, next) {
  // do your magic!
  console.log("REQ METHOD: ", method)
  console.log("REQ URL: ", "http://localhost:5000", baseUrl, url)
  console.log("REQ TIMESTAMP: ", new Date())
  next()
}

async function validateUserId(req, res, next) {
  const { id } = req.params
  // do your magic!
  try {
    const user = await Users.getById(id)
    if (!user) {
      res.status(404).json(`The user with id ${id} could not be found`)
    } else {
      req.user = user
      next()
    }
  } catch (error) {
    res.status(500).json("ouch")
  }
}

function validateUser(req, res, next) {
  const { id } = req.params
  const { body } = req
  // do your magic!
  Users.update(id, body)
    if (!body) {
      res.status(400).json("missing user data")
    } else if (!body.name) {
      res.status(404).json("missing required name field")
    } else {
      req.body = body
      next()
    }
}

function validatePostId(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser }
