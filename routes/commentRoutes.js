const router = require('express').Router()
const { Comment, Discussion, Question, User } = require('../models')

// GET all items
// router.get('/questions', (req, res) => {
//   Question.find()
//     .then(questions => res.json(questions))
//     .catch(err => console.log(err))
// })

// POST one item
// Creating a discussion and bounding it to a question and user
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

// PUT one item
// router.put('/question/:id', (req, res) => {
//   Discussion.findByIdAndUpdate(req.params.id, req.body)
//     .then(() => res.sendStatus(200))
//     .catch(err => console.log(err))
// })

// DELETE one item
// router.delete('/items/:id', (req, res) => {
//   Question.findByIdAndDelete(req.params.id)
//     .then(() => res.sendStatus(200))
//     .catch(err => console.log(err))
// })

module.exports = router
