const router = require('express').Router()

router.use('/api', require('./itemRoutes.js'))
router.use('/api', require('./userRoutes.js'))
router.use('/api', require('./questionRoutes.js'))

module.exports = router
