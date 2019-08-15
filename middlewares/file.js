const { Storage } = require('@google-cloud/storage')
const path = require('path')
const CLOUD_BUCKET = process.env.CLOUD_BUCKET

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: path.join(__dirname, '../google-storage.json')
})
const bucket = storage.bucket(CLOUD_BUCKET)

const getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}

let promises = []
const sendUploadToGCS = (req, res, next) => {
    req.files.forEach((item) => {
        const type = item.mimetype.split('/')
        if (item.mimetype !== 'application/pdf') {
            if(type[0] !== 'image') {
                throw({
                    status: 406,
                    message: "File type should be .pdf / image"
                })
            }
          }
    })
    req.files.forEach((item) => {
        const gcsname = Date.now() + item.originalname 
        const file = bucket.file(gcsname)

        const newPromises = new Promise((resolve, reject) => {
            const stream = file.createWriteStream({
                metadata: {
                    contentType: item.mimetype
                }
            })

            stream.on('finish', () => {
                file.makePublic().then(() => {
                    resolve(getPublicUrl(gcsname))
                })
            })

            stream.on('error', (err) => {
                next(err)
            })

            stream.end(item.buffer)
        })

        promises.push(newPromises)
    })

    Promise.all(promises).then((response) => {
        req.body.link = response
        promises = []
        next()
    }).catch(next)

  
//   const gcsname = Date.now() + req.file.originalname
//   const file = bucket.file(gcsname)

//   const stream = file.createWriteStream({
//     metadata: {
//       contentType: req.file.mimetype
//     }
//   })

//   stream.on('error', (err) => {
//     req.file.cloudStorageError = err
//     next(err)
//   })

//   stream.on('finish', () => {
//     req.file.cloudStorageObject = gcsname
//     file.makePublic().then(() => {
//       req.body.link = getPublicUrl(gcsname)
//       next()
//     })
//   })

//   stream.end(req.file.buffer)
}

const Multer = require('multer'),
      multer = Multer({
        storage: Multer.MemoryStorage,
        limits: {
          fileSize: 5 * 1024 * 1024
        }
        // dest: '../images'
      })

module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  multer
}