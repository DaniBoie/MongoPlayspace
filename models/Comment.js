const { model, Schema, ObjectId } = require('mongoose')

const Comment = new Schema({
  discussion: {
    type: ObjectId,
    ref: 'Discussion',
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
  }
}, { timestamps: true })

module.exports = model('Comment', Comment)
