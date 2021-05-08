// const { ObjectID } = require('bson')
const { model, Schema, ObjectId } = require('mongoose')

const Question = new Schema({
  author: {
    type: ObjectId,
    ref: 'User'
  },
  type: {
    type: String
    // required: true
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  folders: [String],
  discussions: [ // Array(s)
    {
      type: ObjectId,
      ref: 'Discussion'
    }
  ],
  studentAnswer: {
    type: ObjectId,
    ref: 'Answer'
  },
  instructorAnswer: {
    type: ObjectId,
    ref: 'Answer'
  }

}, { timestamps: true })

module.exports = model('Question', Question)
