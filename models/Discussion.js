const { model, Schema, ObjectId } = require('mongoose')

const Discussion = new Schema({
  question: {
    type: ObjectId,
    ref: 'Question',
    required: true
  },
  author: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  body: {
    type: String,
    required: true
  },
  comments: [ // Array(s)
    {
      type: ObjectId,
      ref: 'Comment'
    }
  ]
}, { timestamps: true })

module.exports = model('Discussion', Discussion)
