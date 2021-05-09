const router = require('express').Router()
const { Discussion, Question, User } = require('../models')

// GET all items
// router.get('/questions', (req, res) => {
//   Question.find()
//     .then(questions => res.json(questions))
//     .catch(err => console.log(err))
// })

// POST one item
// Creating a discussion and bounding it to a question and user
router.post('/discussions', (req, res) => {
  Discussion.create(req.body)
    .then(discussion => {
      console.log(discussion)

      Question.findByIdAndUpdate(discussion.question, { $push: { discussions: discussion._id } })
        .then(data => console.log(data))
        .catch(err => console.log(err))

      User.findByIdAndUpdate(discussion.author, { $push: { discussions: discussion._id } })
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
