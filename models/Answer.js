const { model, Schema, ObjectId } = require('mongoose')

const Answer = new Schema({
  question: {
    type: ObjectId,
    ref: 'Question',
    required: true
  },
  body: {
    type: String
  },
  authors: [ // Array(s)
    {
      type: ObjectId,
      ref: 'User'
    }
  ]
}, { timestamps: true })

module.exports = model('Answer', Answer)
