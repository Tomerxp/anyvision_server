// make bluebird default Promise
Promise = require('bluebird') // eslint-disable-line no-global-assign
const serverless = require('serverless-http')
const app = require('./config/express')
const mongoose = require('./config/mongoose')

mongoose.connect()

module.exports = app
module.exports.handler = serverless(app)
