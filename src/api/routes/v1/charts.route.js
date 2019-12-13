const express = require('express')
const controller = require('../../controllers/charts.controller')

const router = express.Router()

router.route('/top').get(controller.topSearching)

module.exports = router
