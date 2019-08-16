const express = require('express')
const router = express.Router()
const UserRouter = require('./user')
const StoryRouter = require('./story')

router.use('/user', UserRouter)
router.use('/story', StoryRouter)

module.exports = router