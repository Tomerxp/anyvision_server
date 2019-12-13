const express = require('express')
const controller = require('../../controllers/search.controller')

const router = express.Router()

router.route('/').get(controller.searchTunes)
router.route('/:id').get(controller.searchTuneById)

module.exports = router
