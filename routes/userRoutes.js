const router = require('express').Router()
const { User } = require('../models')

// GET all users
router.get('/users', (req, res) => {
  console.log('hit it')
  User.find()
    .then(items => res.json(items))
    .catch(err => console.log(err))
})

// router.get('/users/questions/:id', (req, res) => {
//   console.log('hit it')
//   User.findById(req.params.id)
//     .then(items => res.json(items))
//     .catch(err => console.log(err))
// })

// POST one item

router.post('/users', (req, res) => {
  User.create(req.body)
    .then(item => res.json(item))
    .catch(err => console.log(err))
})

// PUT class item
// router.put('/users/class/:id', (req, res) => {
//   User.findByIdAndUpdate(req.params.id, req.body)
//     .then(() => res.sendStatus(200))
//     .catch(err => console.log(err))
// })

// PUT comment item
// router.put('/users/comment/:id', (req, res) => {
//   Comment.create(req.body.(whatever))
//     .then(data => {
//       User.findByIdAndUpdate(req.params.id, user.comments.push(data._id))
//         .then(() => res.sendStatus(200))
//         .catch(err => console.log(err))
//     })
//     .catch(err => console.log(err))
// })

// // PUT question item
// router.put('/users/question/:id', (req, res) => {
//   User.findByIdAndUpdate(req.params.id, req.body)
//     .then(() => res.sendStatus(200))
//     .catch(err => console.log(err))
// })

// // PUT class item
// router.put('/users/class/:id', (req, res) => {
//   User.findByIdAndUpdate(req.params.id, req.body)
//     .then(() => res.sendStatus(200))
//     .catch(err => console.log(err))
// })

// DELETE one item
router.delete('/users/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

module.exports = router
