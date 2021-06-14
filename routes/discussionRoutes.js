const router = require('express').Router()
const { Discussion, Question, User } = require('../models')
const { populate } = require('../models/Item')

// GET discussions from a specific question.
router.get('/discussions/:question_id', (req, res) => {
  Question.findById(req.params.question_id)
    .populate({
      path: 'discussions',
      populate: {
        path: 'comments'
      }
    })
    .then(data => {
      res.send(data.discussions)
    })
    .catch(err => console.log(err))
})

// POST one discussion
// Creating a discussion and binding it to a question and user.
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
router.put('/discussions/:id', (req, res) => {
  Discussion.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

module.exports = router
