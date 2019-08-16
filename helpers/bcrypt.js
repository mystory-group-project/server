const bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports = {
    generateHash(password) {
        return bcrypt.hashSync(password, saltRounds)
    },
    comparePassword(password, hash) {
        return bcrypt.compareSync(password,hash)
    }
}