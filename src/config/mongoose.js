const mongoose = require('mongoose')
const logger = require('./../config/logger')
const { mongo, env } = require('./vars')

// set mongoose Promise to Bluebird
mongoose.Promise = Promise

mongoose.connection.on('error', err => {
  logger.error(`MongoDB connection error: ${err}`)
  process.exit(-1)
})

if (env === 'development') {
  mongoose.set('debug', true)
}

exports.connect = () => {
  mongoose
    .connect(mongo.uri, {
      useCreateIndex: true,
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => logger.info('MongoDB connected...'))
  return mongoose.connection
}
