const { Storage } = require('@google-cloud/storage')
const path = require('path')
const CLOUD_BUCKET = process.env.CLOUD_BUCKET

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.key_file
})

const bucket = storage.bucket(CLOUD_BUCKET)
let promises = []
module.exports = (req, res, next) => {
    req.files.forEach((item) => {
        const file = bucket.file(item)

        const newPromise = new Promise((resolve, reject) => {
            file.delete()
            .then(() => {
                resolve('success')
            })
            .catch(next)
        })

        promises.push(newPromise)
    })

    Promise.all(promises).then((response) => {
        promises = []
        res.status(200).json("Delete Success")
    }).catch(next)
}