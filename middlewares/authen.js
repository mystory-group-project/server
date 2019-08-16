const verify = require('../helpers/jwt').verify

module.exports = (req, res, next) => {
    try {
        req.decode = verify(req.headers.token)
        next()
    }
    catch (err) {
        res.status(400).json("please login first")
    }
}
