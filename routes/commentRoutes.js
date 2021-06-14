const router = require('express').Router()
const { Comment, Discussion, Question, User } = require('../models')

// POST one comment
// Creating a comment and binding it to a discussion and user
router.post('/comments', (req, res) => {
  Comment.create(req.body)
    .then(comment => {
      console.log(comment)

      Discussion.findByIdAndUpdate(comment.discussion, { $push: { comments: comment._id } })
        .then(data => console.log(data))
        .catch(err => console.log(err))

      User.findByIdAndUpdate(comment.author, { $push: { comments: comment._id } })
        .then(data => res.sendStatus(200))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

// PUT one comment
router.put('/comments/:id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

module.exports = router
