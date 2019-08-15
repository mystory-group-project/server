const mongoose = require('mongoose')
const Schema = mongoose.Schema

let storySchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    pdf: {
        type: String,
        required: [true, 'please insert pdf file']
    },
    image: {
        type: String,
        required: [true, 'please insert image']
    },
    title: {
        type: String,
        required: [true, 'please insert title']
    },
    description: {
        type: String,
        required: [true, 'please insert description']
    }
}, {
    versionKey: false
})

const Story = mongoose.model('Story', storySchema)

module.exports = Story