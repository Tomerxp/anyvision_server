const Searches = require('../models/searches.model')

exports.topSearches = async (req, res) => {
  try {
    const topResults = await Searches.aggregate([
      // { $match: { userId } },
      { $group: { _id: '$searchTerm', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ])

    res.json(topResults)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}
