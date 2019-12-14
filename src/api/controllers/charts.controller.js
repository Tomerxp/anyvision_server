const Searches = require('../models/searches.model')

exports.topSearching = async (req, res) => {
  try {
    const userId = req.headers.authorization

    const topResults = await Searches.find(
      { userId },
      ['searchTerm', 'count'],
      {
        sort: { count: -1 },
        skip: 0,
        limit: 10,
      },
    )

    res.json(topResults)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

exports.globalTopSearching = async (req, res) => {
  try {
    const topResults = await Searches.aggregate([
      { $group: { _id: '$searchTerm', count: { $sum: '$count' } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      {
        $project: {
          _id: 0,
          searchTerm: '$_id',
          count: '$count',
        },
      },
    ])

    res.json(topResults)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}
