if(!process.env.NODE_ENV || process.env.NODE_ENV == 'development') {
    require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose')
const errhandler = require('./middlewares/errhandler')
const routes = require('./routes')
const uri = process.env.mongoDB_URI


mongoose.connect(uri, {useNewUrlParser: true },function (err) {
    if (err) {
        console.log(err)
    }
    else {
        console.log('CONNECTED TO MONGOOSE..')
    }
})


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', routes)

app.use(errhandler)
app.listen(PORT, () => console.log(`LISTENING TO PORT ${PORT}`))