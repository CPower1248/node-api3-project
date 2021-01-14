const express = require('express');
const Users = require("./users-model")

const router = express.Router();

const { validateUserId, validateUser } = require("../middleware/middleware")

// WIP
router.post('/', validateUser, (req, res, next) => {
  Users.insert(req.body)
    .then(newUser => {
      res.status(200).json(newUser)
    })
    .catch(next)
});

router.get('/', (req, res, next) => {
  Users.get()
    .then(users => {
      if (!users) {
        res.status(404).json({ errorMessage: "Could not retrieve users"})
      } else {
        res.status(200).json(users)
      }
    })
    .catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
  const { user } = req
  res.status(200).json(user)
});

router.delete('/:id', validateUserId, (req, res, next) => {
  Users.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "The user has been deleted" })
    })
    .catch(next)
});

// WIP
router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  Users.update(req.params.id, req.body)
    .then(updatedUser => {
      res.status(200).json(updatedUser)
    })
    .catch(next)
});

// WIP
router.post('/:id/posts', validateUserId, validateUser, (req, res, next) => {
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const { id } = req.params
  Users.insert(id)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(next)
});

// WIP
router.get('/:id/posts', validateUserId, (req, res, next) => {
  // do your magic!
  // this needs a middleware to verify user id
});

router.use((error, req, res, next) => {
  res.status(500).json({ 
    error: "There was a problem communicating with the server",
    message: error.message,
    stack: error.stack
  })
})

module.exports = router
