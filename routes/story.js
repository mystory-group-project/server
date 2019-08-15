const express = require('express')
const router = express.Router()
const StoryController = require('../controllers/StoryController')
const file = require('../middlewares/file')
const authentication = require('../middlewares/authen')

router.use(authentication)
router.post('/create', file.multer.array('link'), file.sendUploadToGCS, StoryController.create)

module.exports = router