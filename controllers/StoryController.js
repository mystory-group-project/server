const Story = require('../models/story')

class StoryController {
    static create(req, res, next) {
        const { title, description, link } = req.body;
        const author = req.decode._id 
        Story.create({
            title,
            description,
            link,
            author
        })
        .then(results => {
            res.status(200).json(results)
        })
        .catch(next)
    }
}

module.exports = StoryController