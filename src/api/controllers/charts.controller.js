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
    const topResults = await Searches.find({}, ['searchTerm', 'count'], {
      sort: { count: -1 },
      skip: 0,
      limit: 10,
    })

    res.json(topResults)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}
