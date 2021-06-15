const router = require('express').Router()
const { Answer, Comment, Question, User, Class } = require('../models')
const ShortUniqueId = require('short-unique-id')

// GET classes for a specific user, populating instructor information.

router.get('/classes/:user_id', (req, res) => {
  User.findById(req.params.user_id)
    .populate({
      path: 'classes',
      populate: {
        path: 'instructors'
      }
    })
    .then(data => res.send(data.classes))
    .catch(err => console.log(err))
})

// Creating a class and binding it to an instructor.
router.post('/classes/:user_id', (req, res) => {
  const uid = new ShortUniqueId(length = 5)

  Class.create({
    code: uid(),
    name: req.body.name
  })

    .then(newClass => {
      console.log(newClass)

      User.findByIdAndUpdate(req.params.user_id, { $push: { classes: newClass._id } })
        .then(data => console.log(data))
        .catch(err => console.log(err))

      Class.findByIdAndUpdate(newClass._id, { $push: { instructors: req.params.user_id } })
        .then(data => console.log(data))
        .catch(err => console.log(err))

      res.send(newClass)
    })
    .catch(err => console.log(err))
})

// New Class Join Request.
router.put('/classes/join_request/:class_id/:user_id', (req, res) => {
  Class.findByIdAndUpdate(req.params.class_id, { $push: { requests: req.params.user_id } })
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

// Accepting Join Request for student / instructor
router.put('/classes/accept_request/:class_id/:user_id', (req, res) => {
  Class.findByIdAndUpdate(req.params.class_id, { $pull: { requests: req.params.user_id } })
    .then(() => {
      User.findById(req.params.user_id)
        .then(user => {
          if (user.type === 'student') {
            Class.findByIdAndUpdate(req.params.class_id, { $push: { students: user._id } })
              .then(() => res.sendStatus(200))
              .catch(err => console.log(err))
          } else if (user.type === 'instructor') {
            Class.findByIdAndUpdate(req.params.class_id, { $push: { instructors: user._id } })
              .then(() => res.sendStatus(200))
              .catch(err => console.log(err))
          }
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

// Rejecting Join Request for student / instructor
router.put('/classes/reject_request/:class_id/:user_id', (req, res) => {
  Class.findByIdAndUpdate(req.params.class_id, { $pull: { requests: req.params.user_id } })
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})



module.exports = router
