const mongoose = require('mongoose')
const httpStatus = require('http-status')
const APIError = require('../utils/APIError')

const SearchesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  searchTerm: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
})

SearchesSchema.statics = {
  async generate(userId, searchTerm) {
    if (mongoose.Types.ObjectId.isValid(userId)) {
      const query = { userId, searchTerm }

      return Searches.findOneAndUpdate(
        query,
        { $inc: { count: 1 } },
        { new: true, upsert: true },
      )
    }

    throw new APIError({
      message: 'User does not exist',
      status: httpStatus.NOT_FOUND,
    })
  },
}

/**
 * @typedef RefreshToken
 */
const Searches = mongoose.model('Searches', SearchesSchema)
module.exports = Searches
