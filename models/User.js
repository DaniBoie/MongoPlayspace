const { model, Schema, ObjectId } = require('mongoose')

const User = new Schema({
  type: {
    type: String,
    required: true
  },
  real_name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  questions: [ // Array(s)
    {
      type: ObjectId,
      ref: 'Question'
    }
  ],
  discussions: [
    {
      type: ObjectId,
      ref: 'Discussion'
    }
  ],
  comments: [
    {
      type: ObjectId,
      ref: 'Comment'
    }
  ],
  classes: [
    {
      type: ObjectId,
      ref: 'Class'
    }
  ]

}, { timestamps: true })

module.exports = model('User', User)
