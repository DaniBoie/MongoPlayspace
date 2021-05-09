const router = require('express').Router()
const { Answer, Comment, Discussion, Question, User } = require('../models')

// GET all items
// router.get('/questions', (req, res) => {
//   Question.find()
//     .then(questions => res.json(questions))
//     .catch(err => console.log(err))
// })

// POST one item
// Creating a discussion and bounding it to a question and user
router.post('/answers/:user_type', (req, res) => {
  const location = req.params.user_type
  Answer.create(req.body)
    .then(answer => {
      console.log(answer)
      if (location === 'student') {
        Question.findByIdAndUpdate(answer.question, { studentAnswer: answer._id })
          .then(data => res.send(data))
          .catch(err => console.log(err))
      } else if (location === 'instructor') {
        Question.findByIdAndUpdate(answer.question, { instructorAnswer: answer._id })
          .then(data => res.send(data))
          .catch(err => console.log(err))
      }
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
