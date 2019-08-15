const express = require('express')
const router = express.Router()
const StoryController = require('../controllers/StoryController')

router.post('/create', StoryController.create)

module.exports = router