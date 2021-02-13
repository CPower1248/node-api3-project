const express = require('express');
const Posts = require("./posts-model")

const router = express.Router();

const { validatePostId } = require("../middleware/middleware")

router.get('/', (req, res, next) => {
  Posts.get()
    .then(posts => {
      if (!posts) {
        res.status(404).json({ errorMessage: "No posts were found"})
      } else {
        res.status(200).json(posts)
      }
    })
    .catch(next)
});

router.get('/:id', validatePostId, (req, res) => {
  const { post } = req
  res.status(200).json(post)
});

router.delete('/:id', validatePostId, (req, res, next) => {
  const { id } = req.params
  Posts.remove(id)
    .then(() => {
      res.status(200).json({ message: "The post has been deleted" })
    })
    .catch(next)
});

// WIP
router.put('/:id', (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
});

router.use((error, req, res, next) => {
  res.status(500).json({ 
    error: "There was a problem communicating with the server",
    message: error.message,
    stack: error.stack
  })
})

module.exports = router
