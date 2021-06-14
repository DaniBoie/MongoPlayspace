const { model, Schema, ObjectId } = require('mongoose')

const Class = new Schema({
  code: {
    type: String,
    // unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  questions: [ // Array(s)
    {
      type: ObjectId,
      ref: 'Question'
    }
  ],
  folders: [
    String
  ],
  instructors: [
    {
      type: ObjectId,
      ref: 'User'
    }
  ],
  students: [
    {
      type: ObjectId,
      ref: 'User'
    }
  ],
  requests: [
    {
      type: ObjectId,
      ref: 'User'
    }
  ]

}, { timestamps: true })

module.exports = model('Class', Class)
