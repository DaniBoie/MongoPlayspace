const router = require('express').Router()

router.use('/api', require('./itemRoutes.js'))
router.use('/api', require('./userRoutes.js'))
router.use('/api', require('./questionRoutes.js'))
router.use('/api', require('./discussionRoutes.js'))
router.use('/api', require('./commentRoutes.js'))
router.use('/api', require('./answerRoutes.js'))
router.use('/api', require('./classRoutes.js'))


module.exports = router
