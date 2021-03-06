const Story = require('../models/story')

class StoryController {
    static create(req, res, next) {
        const { title, description, link } = req.body;
        const author = req.decode._id 
        const pdf = link[0];
        const image = link[1]
        Story.create({
            title,
            description,
            pdf,
            author,
            image
        })
        .then(results => {
            res.status(200).json(results)
        })
        .catch(next)
    }

    static loadAll(req, res, next) {
        Story.find().populate('author')
        .then(results => {
            res.status(200).json(results)
        })
        .catch(next)
    }

    static delete(req, res, next) {
        Story.findByIdAndDelete(req.params.id)
        .then(results => {

            let pdf_name = results.pdf.split('/')
            pdf_name = pdf_name[pdf_name.length-1]
            let image_name = results.image.split('/')
            image_name = image_name[image_name.length - 1]
            req.files = [pdf_name, image_name]
            next()
        })
        .catch(next)
    }

    static update(req, res, next) {
        Story.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        .then(results => {
            res.status(200).json(results)
        })
        .catch(next)
    }
}

module.exports = StoryController