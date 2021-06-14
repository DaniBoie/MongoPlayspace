const router = require('express').Router()
const { Answer, Comment, Question, User } = require('../models')

// POST one answer
// Creating an answer and binding it to a question and user_type.

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

// PUT one answer (Update an answer.)
router.put('/answers/:id', (req, res) => {
  Answer.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

module.exports = router
