const axios = require('axios')
const Searches = require('../models/searches.model')

const itunesAPIUrl = 'https://itunes.apple.com/search'
const resultsLimit = 25

exports.searchTunes = async (req, res) => {
  const { term } = req.query
  const encodedTerm = encodeURI(term)

  try {
    const results = await axios.get(
      `${itunesAPIUrl}?term=${encodedTerm}&limit=${resultsLimit}`,
    )

    await Searches.generate(term.toLowerCase())

    res.json(results.data.results)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

exports.searchTuneById = async (req, res) => {
  const { id } = req.params
  const encodedId = encodeURI(id)

  try {
    const results = await axios.get(`${itunesAPIUrl}?term=${encodedId}`)

    if (results.data.resultCount <= 0) {
      res.status(404).json({ results: [] })
    } else {
      res.json(results.data.results)
    }
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}
