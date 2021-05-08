const router = require('express').Router()
const { Question, User } = require('../models')

// GET all items
router.get('/questions', (req, res) => {
  Question.find()
    .then(questions => res.json(questions))
    .catch(err => console.log(err))
})

// POST one item
// Creating a question and bounding it to a User
router.post('/questions', (req, res) => {
  Question.create(req.body)
    .then(item => {
      console.log(item)
      User.findByIdAndUpdate(req.body.author, { $push: { questions: item._id } })
        .then(data => {
          res.send(data)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

// PUT one item
router.put('/question/:id', (req, res) => {
  Question.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

// DELETE one item
router.delete('/items/:id', (req, res) => {
  Question.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

module.exports = router
