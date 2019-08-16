const express = require('express')
const router = express.Router()
const StoryController = require('../controllers/StoryController')
const file = require('../middlewares/file')
const authentication = require('../middlewares/authen')
const authorization = require('../middlewares/author')
const deleteFile = require('../middlewares/deletefile')

router.use(authentication)
router.post('/create', file.multer.array('link'), file.sendUploadToGCS, StoryController.create)
router.get('/', StoryController.loadAll)
router.delete('/:id', authorization, StoryController.delete, deleteFile)
router.put('/:id', authorization, file.multer.array('link'), file.sendUploadToGCS, StoryController.update)

module.exports = router