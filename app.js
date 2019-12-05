const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const pathToSwaggerUi = path.join(__dirname + '/src/dist')

// const indexRouter = require('./routes/index')
// const usersRouter = require('./routes/users')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(pathToSwaggerUi))

// app.use(require('./services'))
app.use(require('./routes'))

module.exports = app
