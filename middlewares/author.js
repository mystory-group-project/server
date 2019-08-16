const Story = require('../models/story')

module.exports = (req, res, next) => {
    Story.findOne({
        _id: req.params.id
    })
    .then(story => {
        if (story.author == req.decode._id) {
            next()
        }
        else {
            res.status(400).json("You are not authorized user")
        }
    })
    .catch(next)
}