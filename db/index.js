module.exports = require('mongoose').connect('mongodb://localhost/playground_db',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
