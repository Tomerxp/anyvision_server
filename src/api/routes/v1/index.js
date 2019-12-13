const express = require('express')
const searchRoutes = require('./search.route')
const chartsRoutes = require('./charts.route')

const router = express.Router()

router.get('/status', (req, res) => res.send('OK'))

router.use('/search', searchRoutes)
router.use('/charts', chartsRoutes)

module.exports = router
