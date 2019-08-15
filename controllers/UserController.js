const User = require('../models/user')
const comparePassword = require('../helpers/bcrypt').comparePassword
const generateToken = require('../helpers/jwt').generateToken
class UserController {
    static register(req, res, next) {
        const { username, email, password } = req.body;
        User.create({
            username,
            email,
            password
        })
        .then(created => {
            res.status(200).json(created)
        })
        .catch(next)
    }

    static login(req, res, next) {
        const { email, password } = req.body;
        User.findOne({ email })
        .then(user => {
            if(!user) {
                throw({ status: 404, message: "email / password wrong"})
            }
            else {
                if(comparePassword(password, user.password)) {
                    const payload = {
                        _id: user._id,
                        username: user.username,
                        email: user.email
                    }
                    const token = generateToken(payload)
                    res.status(200).json({ token, username: user.username })
                }
                else {
                    throw({ status: 404, message: "email / password wrong"})
                }
            }
        })
        .catch(next)
    }
}

module.exports = UserController
