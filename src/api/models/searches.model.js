const mongoose = require('mongoose')
const moment = require('moment-timezone')

const SearchesSchema = new mongoose.Schema({
  searchTerm: {
    type: String,
    required: true,
  },
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // },
  date: { type: Date },
})

SearchesSchema.statics = {
  async generate(searchTerm) {
    const date = moment().toDate()
    const SearchObject = new Searches({
      searchTerm,
      date,
    })
    await SearchObject.save()
    return SearchObject
  },
}

/**
 * @typedef RefreshToken
 */
const Searches = mongoose.model('Searches', SearchesSchema)
module.exports = Searches
