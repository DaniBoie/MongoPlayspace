const router = require('express').Router()
const { Question, User, Class } = require('../models')

// GET all questions (for class)
router.get('/questions/:class_id', (req, res) => {
  Class.findById(req.params.class_id)
    .populate('questions')
    .then(classy => res.json(classy.questions))
    .catch(err => console.log(err))
})

// POST one question
// Creating a question and binding it to a User.
// * UPDATE TO ADD TO SPECIFIC CLASS!
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

// DELETE one item (CHECK IF SUBSEQUENT DELETES ARE NEEDED)
router.delete('/items/:id', (req, res) => {
  Question.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

module.exports = router
