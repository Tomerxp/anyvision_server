const Searches = require('../models/searches.model')

exports.topSearching = async (req, res) => {
  try {
    const topResults = await Searches.aggregate([
      // { $match: { userId } },
      { $group: { _id: { $toLower: '$searchTerm' }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ])

    res.json(topResults)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}
